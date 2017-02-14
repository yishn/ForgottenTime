const {remote} = require('electron')
const {h, Component} = require('preact')

class TitleBar extends Component {
    constructor() {
        super()

        this.window = remote.getCurrentWindow()
        this.windowMouseDownPosition = null

        document.addEventListener('mousedown', evt => {
            if (evt.button != 0) return
            if (evt.target.tagName != 'svg') return

            this.windowMouseDownPosition = [evt.x, evt.y]
        })

        document.addEventListener('mouseup', evt => {
            if (evt.button != 0) return
            this.windowMouseDownPosition = null
        })

        document.addEventListener('mousemove', evt => {
            if (!this.windowMouseDownPosition) return

            let [dx, dy] = this.windowMouseDownPosition.map((t, i) => evt[['x', 'y'][i]] - t)
            let [x, y] = this.window.getPosition()

            this.window.setPosition(x + dx, y + dy)
        })
    }

    render() {
        return h('header', {},
            h('span', {class: 'close', title: 'Close', onClick: () => this.window.close()},
                h('img', {
                    src: 'img/close.svg',
                    width: 10,
                    height: 10
                })
            )
        )
    }
}

module.exports = TitleBar
