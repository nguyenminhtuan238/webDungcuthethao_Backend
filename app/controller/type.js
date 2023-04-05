const Types=require('../models/types')
const Products = require('../models/products')
exports.findAll=async (req,res)=>{
    try{
        const types=await Types.find()
    res.json({success:true,types})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
    
}
exports.findOne=async (req,res)=>{
    try{
        const types=await Types.findOne({_id:req.params.id})
    res.json({success:true,types})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
    
}
exports.create= async (req,res)=>{
    const {tenloai}=req.body
    if(!tenloai)
    return res.status(400).json({success:false,message:"Missing type"})
    try{
        const type= await Types.findOne({ten_loai:tenloai})
        if(type)
        return res.status(401).json({success:false,message:"ten loai da ton tai"})
        const newtype=new Types({ten_loai:tenloai})
        await newtype.save()
        const types=await Types.find()
        return res.json({success:true,message:"them loai thanh cong",types})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.update=async (req,res)=>{
    const {tenloai}=req.body
    if(!tenloai)
    return res.status(400).json({success:false,message:"Missing type"})
    try{
        const type= await Types.findOne({ten_loai:tenloai})
        if(type)
        return res.status(400).json({success:false,message:"ten loai da ton tai"})
        let updatetype={ten_loai:tenloai}
        updatetype=await Types.updateOne({_id:req.params.id},updatetype,{new:true})
        if(!updatetype){
            return res.status(401).json({success:false,message:'Update failed'})
        }
        return res.json({success:true,message:"sua loai thanh cong",updatetype})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.deteleOne=async (req,res)=>{
    try{
        const deletetype=await Types.deleteOne({_id:req.params.id})
        const deleteALL=await Products.deleteMany({ID_loai:req.params.id})
        if(!deletetype && !deleteALL){
            return res.status(401).json({success:false,message:'delete failed'})
        }
        const types=await Types.find()
        return res.json({success:true,message:"delete success",types})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.Search=async (req,res)=>{
    try{
        const Search=await Types.find({ten_loai: new RegExp(req.params.id,'i')})
        res.json({success:true,Search})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}