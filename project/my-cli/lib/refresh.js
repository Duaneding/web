const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const handlebars = require('handlebars')
const resolve = dir => path.resolve(__dirname,dir)

module.exports = async () => {
    const list = await fs.readdirSync(resolve('../abc/src/views'))
    .filter(item => item !== 'Home.vue')
    .map(str => ({
        name:str.replace('.vue',''),
        file:str
    }))
    
    compile({list},resolve('../abc/src/router.js'),resolve('../abc/template/router.js.hbs'))
    compile({list},resolve('../abc/src/App.vue'),resolve('../abc/template/App.vue.hbs'))
    console.log(chalk.green('创建完成'));

    function compile(meta,filePath,templatePath){
        if(fs.existsSync(templatePath)){
            const content = fs.readFileSync(templatePath).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(filePath,result);
            console.log(chalk.green(`${filePath}创建成功`));
        }
    }
}