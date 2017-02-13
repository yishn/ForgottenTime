const {h, Component} = require('preact')

class RadialSlider extends Component {
    render() {
        return h('div', {class: 'radial-slider'},
            h('svg', {width: 116, height: 116},
                // Outer circle
                h('circle', {cx: 58, cy: 58, r: 58, fill: '#338AF4'}),

                // Inner circle
                h('circle', {cx: 58, cy: 58, r: 54, fill: '#282C34'})
            )
        )
    }
}

module.exports = RadialSlider
