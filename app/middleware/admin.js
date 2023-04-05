const jwt=require('jsonwebtoken')
const verifytoken = require('./auth')
const verifytokenadmin=(req,res,next)=>{
   verifytoken(req,res,()=>{
       if(req.user.role==1){
           next();
       }else{
           res.status(403).json("not admin")
       }
   })
}   
module.exports=verifytokenadmin