const {h, Component} = require('preact')

let padZero = (n, x) => Array(Math.max(0, n - ('' + x).length)).fill(0).join('') + x

class TimerDisplay extends Component {
    render({time, minutes, seconds}) {
        return h('ul', {class: 'timer-display'},
            h('li', {class: 'time'}, `${time.getHours()}:${padZero(2, time.getMinutes())}`),
            h('li', {class: 'minutes'}, h('span', {}, "'"), `${minutes}'`),
            h('li', {class: 'seconds'}, h('span', {}, '"'), `${seconds}"`)
        )
    }
}

module.exports = TimerDisplay
