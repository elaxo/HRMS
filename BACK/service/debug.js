var colors = require('colors');

module.exports ={
        Info:(info)=>{
            return console.log(`------------------------------------\n ${info} \n-------------------------------------`.yellow)
        },
        Obj:(obj)=>{
            return console.log(`-------------------------------------\n ${JSON.stringify(obj,2,0)} \n--------------------------------------------`.magenta)
        },
        InfoObject:(info,obj)=>{
            return console.log(`-------------------------------------\n ${info} \n ${JSON.stringify(obj,0,2)}\n-------------------------------------`.blue)
        },
        ErrorObject:(info,obj)=>{
            console.log(obj,"".red)
            return console.log(`-------------------------------------\n ${info} \n ${JSON.stringify(obj,0,2)}\n-------------------------------------`.red)
        }

}