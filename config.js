module.exports = {
    serve: {
        port: 9093
    },
    github: {
        url: "https://github.com/WishMelz/meapi.git",  // 仓库地址
        fileName: "app.js", // 仓库文件夹
        path:"/app/auto/",
    },
    shell: {
        gitUpdate: "git pull",  // git 拉取代码
        npmDow: "npm install",   // 下载依赖包
        start: "pm2 reload ",  // 打包指令
    }
}
