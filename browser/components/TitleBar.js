const {remote} = require('electron')
const {Menu} = remote
const {h, Component} = require('preact')

class TitleBar extends Component {
    constructor() {
        super()

        this.window = remote.getCurrentWindow()
        this.mouseDownPos = null

        document.addEventListener('mousedown', evt => {
            if (evt.button != 0) return
            if (evt.target.tagName != 'svg') return

            let {screenX: x, screenY: y} = evt
            this.mouseDownPos = [[x, y], this.window.getPosition()]
        })

        document.addEventListener('mouseup', evt => {
            if (evt.button === 0) {
                this.mouseDownPos = null
            } else if (evt.button === 2) {
                let template = this.props.children.map(x => x.props)
                let menu = Menu.buildFromTemplate(template)

                menu.popup()
            }
        })

        document.addEventListener('mousemove', evt => {
            if (!this.mouseDownPos) return

            let {screenX: x, screenY: y} = evt
            let [[mx, my], [wx, wy]] = this.mouseDownPos
            let [dx, dy] = [x - mx, y - my]

            this.window.setBounds({
                x: wx + dx,
                y: wy + dy,
                width: 150,
                height: 150
            })
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
