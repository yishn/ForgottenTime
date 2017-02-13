const {h, Component} = require('preact')
const TitleBar = require('./TitleBar')
const RadialSlider = require('./RadialSlider')
const TimerDisplay = require('./TimerDisplay')

let padZero = (n, x) => [...Array(Math.max(0, n - ('' + x).length))].map(x => '0').join('') + x

class App extends Component {
    constructor() {
        super()

        this.setState({value: 0, seconds: 0, remaining: 0, countdown: false})
    }

    render(props, state) {
        let minutes = Math.floor(state.remaining / 60)
        let seconds = state.remaining - minutes * 60
        let endDate = new Date(Date.now() + minutes * 60 * 1000)

        return h('div', {id: 'root'},
            h(TitleBar),

            h(RadialSlider, {
                value: state.value,
                onInput: value => this.setState({
                    value,
                    seconds: Math.round(value * 60) * 60,
                    remaining: Math.round(value * 60) * 60
                })
            },
                h(TimerDisplay, {
                    above: `${endDate.getHours()}:${padZero(2, endDate.getMinutes())}`,
                    label: `${minutes}'`,
                    below: `${seconds}"`
                })
            )
        )
    }
}

module.exports = App
