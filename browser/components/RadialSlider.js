const {h, Component} = require('preact')

let cap = (min, max, x) => Math.min(max, Math.max(min, x))
let mod = value => value - Math.floor(value)
let angle = value => mod(value) * 360
let radians = value => mod(value) * 2 * Math.PI

function createMaskPoints(value) {
    if (value <= 0) return ''

    let corners = [[0, 0], [0, 138], [138, 138], [138, 0]]
    if (value >= 1) return corners.map(v => v.join(',')).join(' ')

    let points = [[68, 0], [68, 68]]
    let v = [Math.sin, x => -Math.cos(x)].map(f => 68 + f(radians(cap(0, 1, value))) * 68)

    let distance = ([a, b], [c, d]) => Math.pow(a - c, 2) + Math.pow(b - d, 2)
    let minIndex = corners.findIndex(w => corners.every(w2 => distance(w, v) <= distance(w2, v)))

    points.push(v, ...corners.slice(minIndex), [68, 0])
    return points.map(v => v.join(',')).join(' ')
}

module.exports = function(props) {
    let {
        value = 0,
        minValue = 0,
        maxValue = Infinity,
        onChange = () => {}
    } = props

    value = cap(minValue, maxValue, value)

    return h('div', {class: 'radial-slider'},
        h('svg', {width: 138, height: 138},
            h('defs', {},
                h('mask', {id: 'mask'},
                    h('polygon', {points: createMaskPoints(value), fill: 'white'})
                )
            ),

            h('circle', {cx: 68, cy: 68, r: 60, fill: 'rgba(40, 44, 52, .5)'}),
            h('circle', {cx: 68, cy: 68, r: 60, fill: '#338AF4', mask: 'url(#mask)'})
        ),

        h('div', {
            class: 'indicator',
            style: {transform: `rotate(${angle(value)}deg)`}
        }, h('span')),

        h('div', {class: 'inner'})
    )
}
