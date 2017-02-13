const {remote} = require('electron')
const {h, Component} = require('preact')

class TitleBar extends Component {
    render() {
        return h('header', {},
            h('span', {class: 'drag'}),
            h('span', {class: 'close', onClick: () => remote.getCurrentWindow().close()},
                h('img', {
                    src: 'img/close.svg',
                    width: 10,
                    height: 10,
                    title: 'Close'
                })
            )
        )
    }
}

module.exports = TitleBar
