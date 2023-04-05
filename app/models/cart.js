const mongoose=require('mongoose')
const schema=mongoose.Schema
const cartchema=new schema({
    ID_user:{
        type: schema.Types.ObjectId,
        ref:"users"
    },
})
module.exports=mongoose.model('carts',cartchema)