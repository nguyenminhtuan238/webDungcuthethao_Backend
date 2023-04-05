const cartDT=require('../models/cartdeDt')
const Products=require('../models/products')
const cart=require('../models/cart')
exports.findAll=async (req, res) => {
    try {
        const cartdt = await cartDT.find()
        res.json({ success: true, cartdt })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }

}
exports.findconfirm=async (req, res) => {
    try {
        const cartdt = await cartDT.find({Confirm:true})
        res.json({ success: true, cartdt })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }

}
exports.finduser=async (req, res) => {
    try {
        const cartdt = await cartDT.find({ID_user:req.user.userid})
        res.json({ success: true, cartdt })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }

}
exports.findcart=async (req, res) => {
    const {ID_cart}=req.body
    try {
        const cartdt = await cartDT.find({ID_cart:ID_cart})
        res.json({ success: true, cartdt})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }

}
exports.updatesl= async (req, res) => {
    const {quantity}=req.body
    try {
            let upcart = { 
              quantity:quantity
            }
            upcart=await cartDT.updateOne({_id:req.params.id},upcart,{new:true})
            if (!upcart) {
                return res.status(401).json({ success: false, message: 'Update failed' })
            }
            return res.json({ success: true, message: "sua  thanh cong", upcart})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.updateconfirm= async (req, res) => {
    try {
            let upcart = { 
                Confirm:true
            }
            upcart=await cartDT.updateOne({_id:req.params.id},upcart,{new:true})
            if (!upcart) {
                return res.status(401).json({ success: false, message: 'Update failed' })
            }
            return res.json({ success: true, message: "sua  thanh cong", upcart})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.create=async (req, res) => {
    const { quantity,idpd,ID_cart} = req.body
    if ( !quantity && !idpd)
        return res.status(400).json({ success: false, message: "Missing quantity" })
    try {
            const Cart=await cart.findOne({_id:ID_cart})
            const product=await Products.findOne({_id:idpd})
            const newcart = new cartDT({ 
               ID_user:req.user.userid,
              quantity:quantity,
               ID_pd:product,
               ID_cart:Cart,
               Total:product.Price*quantity,
               Confirm:false

            })
            await newcart.save()
            return res.json({ success: true, message: " thanh cong",newcart })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.deleteOne=async (req, res) => {
    try {
        const deletecart = await cartDT.deleteOne({_id:req.params.id})
        if (!deletecart ) {
            return res.status(401).json({ success: false, message: 'delete failed' })
        }
        return res.json({ success: true, message: "delete success", deletecart  })
    } catch (error) {   
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}