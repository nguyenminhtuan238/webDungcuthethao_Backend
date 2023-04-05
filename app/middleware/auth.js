const jwt=require('jsonwebtoken')
const verifytoken=(req,res,next)=>{
    const authHeader=req.header('Authorization')
    const Token=authHeader && authHeader.split(' ')[1]
    if(!Token)
    return res.status(401).json({success:false,message:"Access token not found"})
    try {
        const decode=jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
        req.user=decode
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({success:false,message:"internal server error"})
    }
}   
module.exports=verifytoken