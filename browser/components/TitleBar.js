const {remote, ipcRenderer} = require('electron')
const {Menu} = require('electron').remote
const {h, Component} = require('preact')

class TitleBar extends Component {
    constructor() {
        super()

        this.window = remote.getCurrentWindow()
        this.mouseDownPos = null

        document.addEventListener('mousedown', evt => {
            if (evt.button != 0) return
            if (evt.target.tagName != 'svg') return

            this.mouseDownPos = [evt.x, evt.y]
        })

        document.addEventListener('mouseup', evt => {
            if (evt.button != 0) return
            this.mouseDownPos = null
        })

        document.addEventListener('mouseup', evt => {
            if (evt.button != 2) return
            if (evt.target.tagName != 'svg') return

            let template = this.props.children.map(x => x.attributes)
            ipcRenderer.send('show-context-menu', template, this.window)
        })

        document.addEventListener('mousemove', evt => {
            if (!this.mouseDownPos) return

            let [dx, dy] = this.mouseDownPos.map((t, i) => evt[['x', 'y'][i]] - t)
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
