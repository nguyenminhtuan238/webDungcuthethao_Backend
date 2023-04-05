const mongoose=require('mongoose')
const schema=mongoose.Schema
const cartDtchema=new schema({
    ID_user:{
        type: schema.Types.ObjectId,
        ref:"users"
    },
    ID_pd:{
        type: schema.Types.ObjectId,
        ref:"Products"
    },
    quantity:{
        type:Number,
        required:true
    },
    Total:{
        type:Number,
        required:true
    },
    Confirm:{
        type:Boolean,
    },
   ID_cart:{
       type:schema.Types.ObjectId,
       ref:"carts"
   }
    
})
module.exports=mongoose.model('cartDts',cartDtchema)