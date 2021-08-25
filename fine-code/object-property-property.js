const obj = {foo:"bar"};
Object.getOwnPropertyDescriptor(obj,'foo')


const appinfo= {
    company:'baidu',
    version:'1.3.2',
    buildId:'0d153522-dfdfff552-sdd1221ff',
    //该函数只访问属性，所以不受冻结的影响
    copyright(){
        return `@ ${new Date().getFullYear()}, ${this.company}`
    }
}
//增删改都不可以，只能查
Object.freeze(appinfo)
Object.isFrozen(appinfo)



class Logger {
    constructor(name){
        this.name = name;
        this.log = [];
    }
    add(entry){
        this.log.push({
            log:entry,
            timestamp:Date.now()
        })
    }
}

const log = new Logger("Captain's dog")

//增删不可以，改和查可以
Object.seal(log)
Object.isSealed(log)

const log2 = new Logger("First lady's dog")

//增不可以，删改查可以

Object.preventExtensions(log2)
Object.isExtensible(log2)