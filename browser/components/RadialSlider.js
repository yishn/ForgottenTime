const {h, Component} = require('preact')

module.exports = ({value}) => h('div', {class: 'radial-slider'},
    h('svg', {width: 138, height: 138},
        h('circle', {cx: 68, cy: 68, r: 60, fill: 'rgba(40, 44, 52, .5)'}),
        h('circle', {cx: 68, cy: 68, r: 60, fill: '#338AF4'})
    ),
    h('div', {class: 'indicator'}),
    h('div', {class: 'inner'})
)
