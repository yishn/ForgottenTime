const {h, Component} = require('preact')
const TitleBar = require('./TitleBar')
const RadialSlider = require('./RadialSlider')

class App extends Component {
    render() {
        return h('div', {id: 'root'},
            h(TitleBar),
            h(RadialSlider)
        )
    }
}

module.exports = App
