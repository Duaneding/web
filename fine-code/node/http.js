const http = require('http');

const server = http.createServer(function(req,res){
    if(req.method === 'GET' && req.url === '/favicon.ico'){
        const fs = require('fs');
        fs.createReadStream('favicon.ico').pipe(res)
        
    }else{
        console.log(`${req.method} ${req.url}`)
        res.end('hello world')
    }
})

server.listen(9000,function(err){
    if(err)console.log('server error!');
    console.log('server is running 9000');
})