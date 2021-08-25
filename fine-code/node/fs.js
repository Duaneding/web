const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'hello.txt'),'hello from Node',function(err){
    if(err)return console.log('Error write to file.');
})

fs.readFile(path.join(__dirname, 'hello.txt'),{encoding:'utf8'},function(err,data){
    if(err)return console.log('Error reado file.');
    console.log('file contentx:',data);
    // process.exit(0)  //错误码，0代表没有错误
    // process.exit(1)


})

try {
    fs.writeFileSync(path.join(__dirname,'hello.sync.txt'),'sync write to file')
} catch (error) {
    console.error('Error writing file.');
}
try {
   fs.readFileSync(path.join(__dirname,'hello.sync.txt'),{encoding:'utf8'},function(err,data){
    if(err)return console.log('Error reado file.');
    console.log('file contentx:',data);

})
} catch (error) {
    console.error('Error writing file.');
}


/**
 * process.argv      node  a.js  file.txt file2.txt
 * process.env       node a.js A=a B=b C=c
 * */ 
// console.log(process.argv,'-------\n',process.env)

//文件流

const ws = fs.createWriteStream(path.join(__dirname,'stream.txt'),{encoding:'utf8'});

ws.write('line 1 \n')
ws.write('line 2 \n')

ws.end();

const rs = fs.createReadStream(path.join(__dirname,'stream.txt'),{encoding:'utf8'});

rs.on('data',function(data){
    console.log('>> data: ' + data.replace('\n','\\n'))
})
rs.on('end',function(data){
    console.log('>> end');
})