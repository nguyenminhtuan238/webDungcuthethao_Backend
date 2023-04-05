const order = require("../models/order")
const cart = require("../models/cart")
exports.findAll=async (req,res)=>{
    try {
        const orders=await order.find()
        return res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
    
}
exports.findoneuser=async (req,res)=>{
    try {
        const orders=await order.find({ID_user:req.params.id})
        return res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
    
}
exports.finduser=async (req,res)=>{
    try {
        const orders=await order.find({ID_user:req.user.userid})
        return res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.findDH=async (req,res)=>{
    try {
        const orders=await order.find({_id:req.params.id})
        return res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

exports.updateDH=async (req,res)=>{
    try {
        const orders=await order.updateOne({_id:req.params.id},{status:true,createAt:Date.now()},{new:true})
        return res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.create=async (req,res)=>{
    const { Name, Address,Phone,Cart, payment,node,totalBill}=req.body
    try {
        const CartL=await cart.findOne({_id:Cart})
        const newOrder = new order({ 
            ID_user:req.user.userid,
           Name,
           Address,
           Phone,
           ID_Cart:CartL,
           node,
           payment,
           status:false,
           totalBill:totalBill,
           createAt:Date.now(),
         })
         await newOrder.save()
         return res.json({ success: true, message: "đặt hàng Thành công",newOrder})

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
    
}