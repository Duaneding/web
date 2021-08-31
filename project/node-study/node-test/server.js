const fs = require('fs');
const http = require('http');

const server = http.createServer((req,res) => {
    const {method,url,headers} = req;
    if(method === 'GET' && url === '/'){
        fs.readFile('index.html',(err,data) => {
            if(err){
                res.statusCode = 500;
                res.setHeader('ContentType','text/plain;chartset=utf-8');
                res.end('服务器错误')
                return;
            }else{
                res.statusCode = 200;
                res.setHeader('ContentType','text/plain;chartset=utf-8');
                res.end(data)
            } 
        })
    }else if(method === 'GET' && headers.accept.includes('image/*')){
        if(url !== '/favicon.ico'){
            const rs = fs.createReadStream(`./images/${url}`)
            rs.pipe(res)
        }else{
            res.end()
        }
        
    }else{
        res.statusCode = 404;
        res.setHeader('ContentType','text/plain;chartset=utf-8');
        res.end('not found , 404!')
    }
    
    
});


const port = 7000; 
server.listen(port,(err) => {
    console.log(err);
})