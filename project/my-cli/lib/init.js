const {promisify} = require("util")
const figlet = promisify(require("figlet"))
const clear = require("clear")
const chalk = require("chalk")
const { clone } = require("./download")
const open = require("open")



const log = (content) => { console.log(chalk.green(content)) }
const spawn = async(...args)=>{
    const child_process = require("child_process")
    return new Promise((res,rej) => {
        const proc = child_process.spawn(...args);
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on("close",() => {
            res()
        })
        proc.on("error",(err) => {
            log(err)
            rej()
        })
        proc.on("data",(data) => {
            log(data)
        })
    })
}
module.exports = async function(name){
    clear()
    const data = await figlet('welcome my-cli');
    log(data)
    log(`创建项目:${name}`)
    // await clone("github:su37josephxia/vue-template",name)

    // log(`安装依赖:${name}`)
    // await spawn(process.platform == 'win32' ? 'npm.cmd':'npm',['install'],{cwd:`./${name}`})
    // log(`
    // 安装完成:
    // To get start:
    // =============
    // cd ${name}
    // npm run serve
    // =============
    // `)
    open('http://localhost:8080')
    await spawn(process.platform == 'win32' ? 'npm.cmd':'npm',['run','serve'],{cwd:`./${name}`})

}





