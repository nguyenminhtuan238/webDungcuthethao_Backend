const Comments=require('../models/comments')
const Products=require('../models/products')
exports.findAll=async (req, res) => {
    try {
        const comments = await Comments.find()
        res.json({ success: true, comments })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }

}
exports.findone=async (req, res) => {
    try {
        const comments = await Comments.find({ID_user:req.params.id})
        res.json({ success: true, comments })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }

}
exports.update= async (req, res) => {
    const {  Post_cm} = req.body
    if ( !Post_cm)
        return res.status(400).json({ success: false, message: "Missing comments" })
    try {
            let upcm = { 
               Post_cm,
               Date_post:Date.now()
            }
            upcm=await Comments.updateOne({_id:req.params.id},upcm,{new:true})     
            if (!upcm) {
                return res.status(401).json({ success: false, message: 'Update failed' })
            }
            getCM=await Comments.find()
            return res.json({ success: true, message: "sua binh luan thanh cong", upcm, getCM})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.create=async (req, res) => {
    const {  namepd,Post_cm} = req.body
    if ( !namepd && !Post_cm)
        return res.status(400).json({ success: false, message: "Missing comments" })
    try {
        const products = await Products.findOne({ Tilte:namepd })
        if (!products)
            return res.status(400).json({ success: false, message: " san pham khong ton tai" })
        
            const newcomments = new Comments({ 
               Post_cm,
               ID_user:req.user.userid,
               Date_post: Date.now(),
               ID_pd:products._id,
               Tilte:namepd
                
            })
            await newcomments.save()
            const cm= await Comments.find()
            return res.json({ success: true, message: "binh luan thanh cong",newcomments,cm })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.deleteOne=async (req, res) => {
    try {
        const deletecm = await Comments.deleteOne({_id:req.params.id})
        if (!deletecm) {
            return res.status(401).json({ success: false, message: 'delete failed' })
        }
        const cm= await Comments.find()
        return res.json({ success: true, message: "delete success", deletecm,cm })
    } catch (error) {   
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.deleteadminone=async (req, res) => {
    try {
        const deletecm = await Comments.deleteOne({_id:req.params.id})
        if (!deletecm) {
            return res.status(401).json({ success: false, message: 'delete failed' })
        }
        const cm= await Comments.find()
        return res.json({ success: true, message: "delete success", deletecm,cm })
    } catch (error) {   
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}