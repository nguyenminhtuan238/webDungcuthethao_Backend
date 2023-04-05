const mongoose=require('mongoose')
const schema=mongoose.Schema
const Orderschema=new schema({
    ID_user:{
        type: schema.Types.ObjectId,
        ref:"users"
    },
   Name:{
        type: String,
    },
    Address:{
        type:String,
    },
    Phone:{
        type:Number,
        required:true
    },
    Node:{
        type:String
    },
    ID_Cart:{
        type:schema.Types.ObjectId,
        ref:"carts"

    },
    payment:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
    },
    totalBill:{
        type:Number,
        require:true
    },
    createAt:{
        type: Date,
        require:true
    }

})
module.exports=mongoose.model('Orders',Orderschema)