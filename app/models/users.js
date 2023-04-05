const mongoose=require('mongoose')
const schema=mongoose.Schema
const Userschema=new schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    img:{
        type:String,
    },
    Name:{
        type: String,
    },
    Address:{
        type:String,
    },
    Phone:{
        type:Number,
    },
    role:{
        type:Number,
        require:true
    },
    Cm:{
        type:Boolean,
        require:true
    },
    Timeban:{
        type:Date,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    createdUp:{
        type:Date,
    }
})
module.exports=mongoose.model('users',Userschema)