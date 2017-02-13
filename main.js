const {app, BrowserWindow} = require('electron')

let window = null

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
    window = new BrowserWindow({
        title: 'ForgottenTime',
        width: 150,
        height: 150,
        useContentSize: true,
        backgroundColor: '#121212',
        resizable: false,
        frame: false,
        show: false
    })

    window.toggleDevTools()

    window
    .on('closed', () => window = null)
    .once('ready-to-show', () => window.show())
    .webContents
    .on('new-window', evt => evt.preventDefault())

    window.loadURL(`file://${__dirname}/browser/index.html`)
})
