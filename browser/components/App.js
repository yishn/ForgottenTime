const {remote, ipcRenderer} = require('electron')
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
            alwaysOnTop: false
        }
    }

    countdownEnded() {
        new Notification('ForgottenTime', {body: "It's time!"})
    }

    componentWillUpdate(_, nextState) {
        this.window.setAlwaysOnTop(nextState.alwaysOnTop)
        localStorage.alwaysOnTop = nextState.alwaysOnTop
    }

    componentDidMount() {
        this.setState({
            alwaysOnTop: localStorage.alwaysOnTop == 'true'
        })

        ipcRenderer
        .on('menu-close', () => this.window.close())
        .on('menu-toggle-alwaysontop', () => this.setState(prevState => ({alwaysOnTop: !prevState.alwaysOnTop})))

        this.window.show()

        setInterval(() => {
            let {countdown, remaining, seconds} = this.state

            if (remaining <= 1) {
                this.window.setProgressBar(0)
                this.setState({remaining: 0, value: 0, countdown: false})

                if (countdown) this.countdownEnded()
                return
            }

            if (!countdown) return

            this.window.setProgressBar(seconds == 0 ? 0 : remaining / seconds)

            this.setState({
                remaining: remaining - 1,
                value: (remaining - 1) / (60 * 60)
            })
        }, 1000)
    }

    render(_, state) {
        let minutes = Math.floor(state.remaining / 60)
        let endDate = new Date(Date.now() + state.remaining * 1000)
        let getSeconds = value => Math.round(value * 60) * 60

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

            h(RadialSlider, {
                value: state.value,
                maxValue: 16.65, // 999 minutes
                activated: state.countdown,

                onInput: value => this.setState({
                    value,
                    seconds: getSeconds(value),
                    remaining: getSeconds(value),
                    countdown: false
                }),

                onSet: value => this.setState({
                    seconds: getSeconds(value),
                    remaining: getSeconds(value),
                    value: Math.round(value * 60) / 60,
                    countdown: getSeconds(value) != 0
                }),

                onClick: () => this.setState({
                    countdown: !this.state.countdown
                })
            },
                h(TimerDisplay, {
                    time: endDate,
                    minutes,
                    seconds: state.remaining - minutes * 60
                })
            )
        )
    }
}

module.exports = App
