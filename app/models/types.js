const mongoose=require('mongoose')
const Schema=mongoose.Schema
const TypeSchema=new Schema({
    ten_loai:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model("Types",TypeSchema)