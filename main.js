const {app, BrowserWindow} = require('electron')

let window = null

app.on('window-all-closed', () => app.quit())

app.on('ready', () => {
    window = new BrowserWindow({
        icon: process.platform == 'linux' ? `${__dirname}/build/logo.png` : null,
        title: app.name,
        width: 150,
        height: 150,
        useContentSize: true,
        backgroundColor: '#121212',
        resizable: false,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // window.webContents.openDevTools({mode: 'detach'})

    window
    .on('closed', () => window = null)
    .webContents
    .on('new-window', evt => evt.preventDefault())

    window.loadURL(`file://${__dirname}/browser/index.html`)
})
