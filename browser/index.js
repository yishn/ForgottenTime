const {h, render} = require('preact')
const App = require('./components/App')

if (localStorage.alwaysOnTop == null)
    localStorage.alwaysOnTop = true

render(h(App), document.body)
