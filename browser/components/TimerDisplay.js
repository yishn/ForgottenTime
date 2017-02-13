const {h, Component} = require('preact')

class TimerDisplay extends Component {
    render({label, above, below}) {
        return h('ul', {class: 'timer-display'},
            h('li', {class: 'above'}, above),
            h('li', {class: 'label'}, label),
            h('li', {class: 'below'}, below)
        )
    }
}

module.exports = TimerDisplay
