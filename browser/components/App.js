const {h, Component} = require('preact')
const TitleBar = require('./TitleBar')
const RadialSlider = require('./RadialSlider')
const TimerDisplay = require('./TimerDisplay')

class App extends Component {
    constructor() {
        super()

        this.setState({value: 0, seconds: 0, remaining: 0, countdown: false})
    }

    componentDidMount() {
        this.timerId = setInterval(() => {
            if (!this.state.countdown) return

            if (this.state.remaining == 1)
                this.setState({countdown: false})

            this.setState({
                remaining: this.state.remaining - 1,
                value: (this.state.remaining - 1) / (60 * 60)
            })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render(props, state) {
        let minutes = Math.floor(state.remaining / 60)
        let endDate = new Date(Date.now() + minutes * 60 * 1000)
        let getSeconds = value => Math.round(value * 60) * 60

        return h('div', {id: 'root'},
            h(TitleBar),

            h(RadialSlider, {
                value: state.value,
                maxValue: 16.65,
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
                    countdown: true
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
