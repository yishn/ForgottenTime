const {h, Component} = require('preact')
const TitleBar = require('./TitleBar')
const RadialSlider = require('./RadialSlider')

class App extends Component {
    constructor() {
        super()
        
        this.setState({value: 0.3})
    }

    render(props, state) {
        return h('div', {id: 'root'},
            h(TitleBar),
            h(RadialSlider, {
                value: state.value,
                onChange: value => this.setState({value})
            })
        )
    }
}

module.exports = App
