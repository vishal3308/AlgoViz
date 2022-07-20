const mongoose=require('mongoose');

const Questionschema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    pagename:{
        type:String,
        required:true
    },
    answer:{
        type:Object
    }

})

module.exports=mongoose.model('Que_ans',Questionschema);