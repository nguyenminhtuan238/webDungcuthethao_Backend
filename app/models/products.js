const mongoose=require('mongoose')
const schema=mongoose.Schema
const ProductSchema=new schema({
    Tilte:{
        type:String,
        require:true
    },
    Price:{
        type:Number,
        require:true
    },
    Image:{
        
    },
    Image_mall:{
        type:Array
    },
    Ifm:{
        type:String,
        require:true
        
    },
    ID_loai:{
        type: schema.Types.ObjectId,
        ref: 'Types'
    },
    Kho:{
        type:Number,
        require:true
    },
    Daban:{
        type:Number,
    }
})
module.exports=mongoose.model("Products",ProductSchema)