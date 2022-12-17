const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(require('cors')())
const shell = require('shelljs')
var expressWs = require('express-ws')
app.use(bodyParser.urlencoded({
    extended: false
}))
expressWs(app)
app.use(bodyParser.json())
const fs = require("fs")

const config = require('./config')
const Port = config.serve.mainPort


app.ws('/wes', function (ws, req) {
    ws.send('连接成功了')
    ws.on('message', function (msg) {
        // 业务代码
        if (msg == '/reload') {
            reload(ws)
        }
    })
})
const reload = (ws) => {
    let flg = fs.existsSync(config.github.fileName)
    // 文件夹不存在
    if (!flg) {
        ws.send(`Clone仓库`)
        setShell(shell.exec(`git clone ${config.github.url}`), ws)
    }

    ws.send(`正在进入文件夹...`)
    setShell(shell.cd(config.github.fileName), ws)

    ws.send(`正在删除${config.github.buildFolderName}`)
    setShell(shell.rm('-rf', config.github.buildFolderName), ws)

    ws.send(`正在删除node_modules...`)
    setShell(shell.rm('-rf', 'node_modules'), ws)

    ws.send(`正在拉取最新代码...`)
    setShell(shell.exec(config.shell.gitUpdate), ws)

    ws.send(`正在下载依赖包...`)
    setShell(shell.exec(config.shell.npmDow), ws)

    ws.send(`正在打包...`)
    setShell(shell.exec(config.shell.build), ws)

    let flgBulid = fs.existsSync(config.github.buildFolderName)
    // 文件夹不存在
    if (!flgBulid) {
        ws.send(`打包失败`)
    }else{
        ws.send(`打包成功！！！`);
        setShell(shell.exec(`mv ${config.github.buildFolderName} ${config.shell.mv}`), ws)
    }
}

const setShell = (shell, ws) => {
    var res = shell
    ws.send('stdout：' + res.stdout)
    ws.send('stderr：' + res.stderr)
    ws.send(`执行结果CODE：${res.code}`)
    ws.send(`-------------------------------`)
}

app.listen(Port, () => {
    console.log('http://127.0.0.1:' + Port)
})
