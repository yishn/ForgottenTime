const {h, Component} = require('preact')

let padZero = (n, x) => Array(Math.max(0, n - ('' + x).length)).fill(0).join('') + x

class TimerDisplay extends Component {
    constructor() {
        super()

        this.state = {
            now: Date.now()
        }
    }

    componentDidMount() {
        this.updateNow()
    }

    componentWillReceiveProps() {
        this.updateNow()
    }

    updateNow() {
        clearTimeout(this.nowTimeout)

        let now = Date.now()
        let wait = 60 - new Date(now + this.props.remaining * 1000).getSeconds()
        
        this.setState({now})
        this.nowTimeout = setTimeout(() => this.updateNow(), wait)
    }

    render({remaining}, {now}) {
        let minutes = Math.floor(remaining / 60)
        let seconds = remaining - minutes * 60
        let time = new Date(now + remaining * 1000)

        return h('ul', {class: 'timer-display'},
            h('li', {class: 'time'}, `${time.getHours()}:${padZero(2, time.getMinutes())}`),
            h('li', {class: 'minutes'}, h('span', {}, "'"), `${minutes}'`),
            h('li', {class: 'seconds'}, h('span', {}, '"'), `${seconds}"`)
        )
    }
}

module.exports = TimerDisplay
