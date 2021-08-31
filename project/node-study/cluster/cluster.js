let cluster = require('cluster')
let os = require('os')

const numsOs = os.cpus().length;

const process = require('process');

const workers = {}
if(cluster.isMaster){
    //依据cpu内核数量，复制并启动子进程
    for(let i = 0;i < numsOs;i++){
        let worker = cluster.fork()
        workers[worker.process.pid] = worker
    }
    //故障恢复
    cluster.on('exit',(worker,code,signal) => {
        console.log('进程结束：',worker.process.pid);
        delete workers[worker.process.pid]
        worker = cluster.fork()
        workers[worker.process.pid] = worker
    })
}else{
    const app = require('./app')
    app.listen(3000)
}

process.on('SIGTERM',() => {
    for(let pid in workers){
        process.kill(pid)
    }
    process.exit(0)
})

require('./test')