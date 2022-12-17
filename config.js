module.exports = {
    serve: {
        mainPort: 9091,
        reloadPort: 9092
    },
    github: {
        url: "https://github.com/WishMelz/imgurl",  // 仓库地址
        fileName: "imgurl", // 仓库文件夹
        buildFolderName: 'dist'
    },
    shell: {
        gitUpdate: "git pull",  // git 拉取代码
        npmDow: "npm install",   // 下载依赖包
        build: "pm2 start ",  // 打包指令
    },
    reload: {
        shell: "pm2 reload 0"
    }
}
