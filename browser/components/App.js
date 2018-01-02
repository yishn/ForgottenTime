const {remote, ipcRenderer} = require('electron')
const {dialog} = remote
const {h, Component} = require('preact')

const MenuItem = Component
const TitleBar = require('./TitleBar')
const RadialSlider = require('./RadialSlider')
const TimerDisplay = require('./TimerDisplay')

class App extends Component {
    constructor() {
        super()

        this.window = remote.getCurrentWindow()

        this.state = {
            value: 0,
            seconds: 0,
            remaining: 0,
            countdown: false,
            alwaysOnTop: localStorage.alwaysOnTop == 'true'
        }

        let getSeconds = value => Math.round(value * 60) * 60

        this.handleSliderInput = value => this.setState({
            value,
            seconds: getSeconds(value),
            remaining: getSeconds(value),
            countdown: false
        })

        this.handleSliderSet = value => {
            let seconds = getSeconds(value)

            this.setState({
                seconds,
                remaining: seconds,
                value: Math.round(value * 60) / 60,
                countdown: seconds != 0
            })

            localStorage.seconds = seconds
        }

        this.handleSliderClick = () => this.setState({
            countdown: !this.state.countdown
        })
    }

    async countdownEnded() {
        let result = dialog.showMessageBox(this.window, {
            type: 'info',
            message: "It's time!",
            buttons: ['Repeat', 'Snooze', 'Dismiss'],
            defaultId: 1,
            cancelId: 2
        })

        await this.animateTimer(result === 1 ? +localStorage.snoozeSeconds : +localStorage.seconds)

        if (result !== 2) {
            this.setState({countdown: true})
        }
    }

    async animateTimer(to, duration = 700, fps = 60, easing = null) {
        if (!easing) easing = t => 0.5 * Math.sin((t - 0.5) * Math.PI) + 0.5

        let from = this.state.remaining
        let fpms = fps / 1000
        let tick = Math.round(1 / fpms)
        let n = Math.round(duration * fpms)
        let i = 0

        this.setState({seconds: to})

        return new Promise(resolve => {
            let updateFrame = () => {
                let seconds = Math.round(from + easing(i / n) * (to - from))

                this.setState({
                    value: seconds / (60 * 60),
                    remaining: seconds
                })

                if (++i <= n) setTimeout(updateFrame, tick)
                else resolve()
            }

            updateFrame()
        })
    }

    componentDidUpdate(_, prevState) {
        if (this.state.alwaysOnTop !== prevState.alwaysOnTop) {
            this.window.setAlwaysOnTop(this.state.alwaysOnTop)
            localStorage.alwaysOnTop = this.state.alwaysOnTop
        }

        if (this.state.countdown && !prevState.countdown) {
            this.countdownInterval = setInterval(() => {
                let {countdown, remaining, seconds} = this.state

                if (remaining <= 1) {
                    this.window.setProgressBar(0)

                    this.setState({remaining: 0, value: 0, countdown: false}, () => {
                        if (countdown) setTimeout(() => this.countdownEnded(), 0)
                    })

                    return
                }

                if (countdown) {
                    this.window.setProgressBar(seconds == 0 ? 0 : remaining / seconds)

                    this.setState({
                        remaining: remaining - 1,
                        value: (remaining - 1) / (60 * 60)
                    })
                }
            }, 1000)
        } else if (!this.state.countdown) {
            clearInterval(this.countdownInterval)
        }
    }

    componentDidMount() {
        ipcRenderer
        .on('menu-close', () => this.window.close())
        .on('menu-toggle-alwaysontop', () => this.setState(prev => ({alwaysOnTop: !prev.alwaysOnTop})))

        this.window.on('move', () => {
            let [x, y] = this.window.getPosition()

            localStorage.windowLeft = x
            localStorage.windowTop = y
        })

        this.animateTimer(+localStorage.seconds)
        this.window.setPosition(+localStorage.windowLeft, +localStorage.windowTop)
        this.window.show()
    }

    render(_, state) {
        return h('div', {id: 'root'},
            h(TitleBar, {},
                h(MenuItem, {
                    label: 'Always On Top',
                    type: 'checkbox',
                    checked: state.alwaysOnTop,
                    action: 'toggle-alwaysontop'
                }),
                h(MenuItem, {
                    label: 'Close',
                    action: 'close'
                })
            ),

            h(RadialSlider,
                {
                    value: state.value,
                    maxValue: 16.65, // 999 minutes
                    activated: state.countdown,

                    onInput: this.handleSliderInput,
                    onSet: this.handleSliderSet,
                    onClick: this.handleSliderClick
                },

                h(TimerDisplay, {remaining: state.remaining})
            )
        )
    }
}

module.exports = App
