const jwt=require('jsonwebtoken')
const verifytoken = require('./auth')
const verifytokencm=(req,res,next)=>{
   verifytoken(req,res,()=>{
       if(req.user.userid==req.params.cm){
           next();
       }else{
           res.status(403).json("bình luận này không phải của bạn ")
       }
   })
}   
module.exports=verifytokencm