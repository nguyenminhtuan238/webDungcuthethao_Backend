const express=require('express')
const router=express.Router()
const order=require('../controller/order')
const verifytokenadmin = require('../middleware/admin')
const verifytoken = require('../middleware/auth')

router.get('/',order.findAll)
router.get('/:id',order.findDH)
router.post('/',verifytoken,order.create)
router.get('/bill/getB',verifytoken,order.finduser)
router.get('/User/:id',verifytokenadmin,order.findoneuser)
router.put('/:id',order.updateDH)
module.exports=router