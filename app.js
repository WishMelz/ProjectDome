const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(require("cors")());
const shell = require("shelljs");
var expressWs = require("express-ws");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
expressWs(app);
app.use(bodyParser.json());
const fs = require("fs");

const config = require("./config");
const Port = config.serve.port;

app.ws("/wes", function (ws, req) {
  ws.send("连接成功了");
  ws.on("message", function (msg) {
    // 业务代码
    if (msg == "/reload") {
      reload(ws, 1);
    }
    if (msg == "/reloads") {
      // 重新下包
      reload(ws, 2);
    }
  });
});
const reload = (ws, type) => {
  ws.send(`正在进入文件夹...`);
  setShell(shell.cd(config.github.path), ws);
  
  if (type == 2) {
    ws.send(`正在删除node_modules...`);
    setShell(shell.rm("-rf", "node_modules"), ws);

    ws.send(`正在拉取最新代码...`);
    setShell(shell.exec(config.shell.gitUpdate), ws);

    ws.send(`正在下载依赖包...`);
    setShell(shell.exec(config.shell.npmDow), ws);
    return;
  }

  ws.send(`正在重启...`);
  setShell(shell.exec(config.shell.start + config.github.fileName), ws);
};

const setShell = (shell, ws) => {
  var res = shell;
  ws.send("stdout：" + res.stdout);
  ws.send("stderr：" + res.stderr);
  ws.send(`执行结果CODE：${res.code}`);
  ws.send(`-------------------------------`);
};

app.listen(Port, () => {
  console.log("http://127.0.0.1:" + Port);
});
