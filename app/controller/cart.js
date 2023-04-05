const cart=require('../models/cart')
exports.findAll=async (req, res) => {
    try {
        const Cart = await cart.find()
        res.json({ success: true, Cart })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }

}
exports.finduser=async (req, res) => {
    try {
        const Cart = await cart.find({ID_user:req.user.userid})
        res.json({ success: true, Cart })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }

}

exports.create=async (req, res) => {
    try {
            const newcart = new cart({ 
               ID_user:req.user.userid,
            })
            await newcart.save()
            return res.json({ success: true, message: " tạo cart thanh cong",newcart })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}
exports.deleteOne=async (req, res) => {
    try {
        const deletecart = await cart.deleteOne({_id:req.params.id})
        if (!deletecart ) {
            return res.status(401).json({ success: false, message: 'delete failed' })
        }
        return res.json({ success: true, message: "delete success", deletecart  })
    } catch (error) {   
        console.log(error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}