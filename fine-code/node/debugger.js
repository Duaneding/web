/**
 * exports  只能导出对象
 * module.exports  可以是对现象、函数或者其他值
 * */ 

const debug1 = require('./debug')('one')
const debug2 = require('./debug')('two')


debug1('started first debugger!')
debug2('started second debugger!')


setTimeout(function(){
    debug1('after some time ...')
    debug2('what happends?')
},200)