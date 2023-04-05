const express=require('express')
const router=express.Router()
const cart=require('../controller/cart')
const verifytoken = require('../middleware/auth')
router.get('/ALL/', cart.findAll)
router.get('/',verifytoken,cart.finduser)
router.post('/',verifytoken,cart.create)
router.delete('/:id', verifytoken,cart.deleteOne)
module.exports=router