const {h, render} = require('preact')
const App = require('./components/App')

if (localStorage.alwaysOnTop == null)
    localStorage.alwaysOnTop = true
if (localStorage.seconds == null)
    localStorage.seconds = 0

render(h(App), document.body)
