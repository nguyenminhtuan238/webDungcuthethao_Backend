const products=require('../models/products')
const types=require('../models/types')
const fs=require('fs')
exports.Search=async (req,res)=>{
    try {
      
        const Search=await products.find({Tilte: new RegExp(req.params.pd,'i')})
        res.json({success:true,Search})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.SearchType=async (req,res)=>{
    try {
        const Type=await types.find({ten_loai:req.params.ty})
        console.log(req.params.pd)
        Type.map(async item=>{
           
                const Search=await products.find({ID_loai:item._id,Tilte: new RegExp(req.params.pd,'i')})
                res.json({success:true,Search})
          
           
        })
       
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.Searchty=async (req,res)=>{
   try {
    const Type=await types.find({ten_loai:req.params.ty})
    Type.map(async item=>{
           
        const Search=await products.find({ID_loai:item._id})
        res.json({success:true,Search})
    })
   } catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:"internal server error"})
   }
}