const webpack = require("webpack")

const options = require("./webpack.config")

const compiler = webpack(options);

Object.keys(compiler.hooks).forEach(key => {
    compiler.hooks[key].tap('eventName',() => {
        console.log("----->",key);
    })
})


compiler.run()