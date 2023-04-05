const mongoose=require('mongoose')
const schema=mongoose.Schema
const commentschema=new schema({
    ID_user:{
        type: schema.Types.ObjectId,
        ref:"users"
    },
    ID_pd:{
        type: schema.Types.ObjectId,
        ref:"Products"
    },
    Tilte:{
        type:String
    },
    Post_cm:{
        type:String,
        required:true
    },
    Date_post:{
        type:Date,
        require:true
    }
})
module.exports=mongoose.model('comments',commentschema)