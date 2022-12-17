const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('./config')
const shell = require('shelljs')
app.use(require('cors')())
var expressWs = require('express-ws')
app.use(bodyParser.urlencoded({
    extended: false
}))
expressWs(app)
app.use(bodyParser.json())


app.get('/reload', (req, res) => {
    let shellres = shell.exec(config.reload.shell)
    if (shellres.code == 0) {
        res.json({
            code: 200
        })
    } else {
        res.json({
            code: 400,
            shellres
        })
    }

})


app.listen(9092, () => {
    console.log('http://127.0.0.1:9092')
})
