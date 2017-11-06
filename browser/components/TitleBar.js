const {remote, ipcRenderer, screen: s} = require('electron')
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

            let {x, y} = s.getCursorScreenPoint()
            this.mouseDownPos = [[x, y], this.window.getPosition()]
        })

        document.addEventListener('mouseup', evt => {
            if (evt.button != 0) return
            this.mouseDownPos = null
        })

        document.addEventListener('mouseup', evt => {
            if (evt.button != 2) return

            let template = this.props.children.map(x => x.attributes)
            ipcRenderer.send('show-context-menu', template, this.window)
        })

        document.addEventListener('mousemove', evt => {
            if (!this.mouseDownPos) return

            let {x, y} = s.getCursorScreenPoint()
            let [[mx, my], [wx, wy]] = this.mouseDownPos
            let [dx, dy] = [x - mx, y - my]

            this.window.setPosition(wx + dx, wy + dy)
        })

        this.handleCloseButtonClick = () => {
            this.window.close()
        }
    }

    render() {
        return h('header', {},
            h('span', {class: 'close', title: 'Close', onClick: this.handleCloseButtonClick},
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
