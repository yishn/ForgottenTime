const {remote} = require('electron')
const {h, Component} = require('preact')

class TitleBar extends Component {
    render() {
        return h('header', {},
            h('span', {class: 'drag'}),
            h('span', {class: 'close', title: 'Close', onClick: () => remote.getCurrentWindow().close()},
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
