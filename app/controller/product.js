const Products = require('../models/products')
const Types = require('../models/types')
const multer=require('multer')
const Sizepage=6
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({
    storage:storage
})

exports.uploadImage=upload.single('image')
exports.uploadphoto=upload.array('photo[]',4)
exports.setImagemall=async (req, res) => {
    try {
        if(req.files.length!==0){
           
           await Products.updateOne({_id:req.params.id},{
           Image_mall:req.files
            })
        const products=await Products.findOne({_id:req.params.id})
        res.json({success:true,products})
        }else{
          
            res.json({success:true})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }

}
exports.findAll=async (req, res) => {
    try {
        let page=req.query.page
        if(page){
            page=parseInt(page)
           const skippage=(page-1)*Sizepage
           const products=await Products.find().skip(skippage).limit(Sizepage)
           res.json({ success: true, products })
        }else{
        const products = await Products.find()
        res.json({ success: true, products })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }

}
exports.findOne=async (req,res)=>{
    try{
        const products=await Products.findOne({_id:req.params.id})
    res.json({success:true,products})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
    
}
exports.create=async (req, res) => {
    const { Tilte, Price, ifm, Kho, tenloai } = req.body
    const image=req.file.filename
    if (!Tilte && !Price && !image && !Kho  && !tenloai)
        return res.status(400).json({ success: false, message: "Missing products" })
    try {
        const title = await Products.findOne({ Tilte })
        const id_Loai=await Types.findOne({ten_loai:tenloai})
        if (title)
            return res.status(401).json({ success: false, message: "ten san pham da ton tai" })
        if(id_Loai!=null){
            const newProduct = new Products({ 
                Tilte:Tilte,
                Price:Price,
                Ifm:ifm,
                ID_loai:id_Loai,
                Image:image,
                Kho:Kho,
                Daban:0
            })
            
            await newProduct.save()
          const  Pd=await Products.find()
            return res.json({ success: true, message: "them san pham thanh cong",Pd })
        }else{
            return res.status(400).json({ success: false, message: "khong co loai nay" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.update=async (req, res) => {
    const { Tilte, Price, ifm, Kho, tenloai } = req.body
    const image= req.file!==undefined?req.file.filename:" "
    if (!Tilte && !Price && !image && !Kho && !tenloai)
        return res.status(400).json({ success: false, message: "Missing products" })
    try {
        const id_Loai=await Types.findOne({ten_loai:tenloai})
        if(req.file!==undefined){
            let updateProduct = {Tilte,Ifm:ifm,Price:Price,Image:image,Kho,ID_loai:id_Loai}         
            if (!updateProduct) {
                return res.status(401).json({ success: false, message: 'Update failed' })
            }
            updateProduct = await Products.updateOne({_id:req.params.id}, updateProduct, { new: true })
            return res.json({ success: true, message: "sua loai thanh cong", updateProduct})
        }else{
            let updateProduct = {Tilte,Ifm:ifm,Price:Price,Kho,ID_loai:id_Loai} 
            if (!updateProduct) {
                return res.status(401).json({ success: false, message: 'Update failed' })
            }
            updateProduct = await Products.updateOne({_id:req.params.id}, updateProduct, { new: true })
            return res.json({ success: true, message: "sua loai thanh cong", updateProduct})
        }    
      
       
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.updateKho=async (req, res) => {
    const {  Kho } = req.body
    if ( !Kho)
        return res.status(400).json({ success: false, message: "Missing products" })
    try {
        let updateProduct = {Kho}
        updateProduct = await Products.updateOne({_id:req.params.id}, updateProduct, { new: true })
        if (!updateProduct) {
            return res.status(401).json({ success: false, message: 'Update failed' })
        }
        return res.json({ success: true, message: " thanh cong", updateProduct})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.updatedaban=async (req, res) => {
    const {  Daban } = req.body
    try {
        let updateProduct = {Daban:Daban}
        updateProduct = await Products.updateOne({_id:req.params.id}, updateProduct, { new: true })
        if (!updateProduct) {
            return res.status(401).json({ success: false, message: 'Update failed' })
        }
        return res.json({ success: true, message: " thanh cong", updateProduct})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.deleteOne=async (req, res) => {
    try {
        const deleteproduct = await Products.deleteOne({_id: req.params.id})
        if (!deleteproduct) {
            return res.status(401).json({ success: false, message: 'delete failed' })
        }
        const products=await Products.find()
        return res.json({ success: true, message: "delete success", products})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}