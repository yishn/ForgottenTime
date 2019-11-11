const electron = require('electron')
const {h, render} = require('preact')
const App = require('./components/App')

let setDefaultSetting = (name, value) => {
    if (localStorage[name] == null)
        localStorage[name] = value
}

let {workAreaSize} = electron.remote.screen.getPrimaryDisplay()

setDefaultSetting('alwaysOnTop', true)
setDefaultSetting('snoozeSeconds', 5 * 60)
setDefaultSetting('seconds', 0)
setDefaultSetting('windowLeft', Math.round(workAreaSize.width / 2) - 75)
setDefaultSetting('windowTop', Math.round(workAreaSize.height / 2) - 75)

render(h(App), document.body)
