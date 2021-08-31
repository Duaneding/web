const http = require('http')
const server = http.createServer((req,res) => {
    Math.random() > 0.6 ? ddd() : 11

    res.end('hello')
})

if(!module.parent){
    server.listen(3000)
}else{
    module.exports = server
}