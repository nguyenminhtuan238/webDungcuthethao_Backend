const jwt=require('jsonwebtoken')
const users=require('../models/users')
const argon2=require('argon2')
const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/imguser/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({
    storage:storage
})

exports.uploadImage=upload.single('imguser')
exports.getAllUser=async (req,res)=>{
    try {
        const user=await users.find({role:0});
        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.findone=async (req,res)=>{
    try {
        const user=await users.findOne({role:0,_id:req.params.id});
        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.findinf=async (req,res)=>{
    try {
        const user= await users.findOne({_id:req.user.userid})
        res.json({user,message:"thành công"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.updateinformation=async(req,res)=>{
    try {
        const {Name,Address,Phone}=req.body
        if(req.file===undefined){
            let upinfor = { 
                Name:Name,
                Address:Address,
                Phone:Phone
             }
            await users.updateOne({_id:req.user.userid},upinfor);
            const user= await users.findOne({_id:req.user.userid})
            res.json({message:"thành công",user})
        }else{
            let upinfor = { 
                Name:Name,
                Address:Address,
                Phone:Phone,
                img:req.file.originalname
             }
            await users.updateOne({_id:req.user.userid},upinfor);
            const user= await users.findOne({_id:req.user.userid})
            res.json({message:"thành công",user})
        }
        
       
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.searchUser=async (req,res)=>{
    try {
        const {username}=req.body
        const user=await users.find({role:0,username: new RegExp(username,'i')});
        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.banCm=async (req,res)=>{
    try {
        const {cm}=req.body
        const user=await users.updateOne({_id:req.params.id},{Cm:cm});
        res.json({message:"ban Comments",user})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.bantime=async (req,res)=>{
    try {
        const {Time}=req.body
        await users.updateOne({_id:req.params.id},{Timeban:Time});
        const nameuser= await users.findOne({_id:req.params.id})
        res.json({message:"ban Comments",nameuser})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.deleteUser=async (req,res)=>{
    try {
        const user=await users.deleteOne({_id:req.params.id});
        res.json({message:"delete successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.register=async (req,res)=>{
    const {username,password,createdUp}=req.body
    if(!username || !password)
    return res.status(401).json({success:false,message:"Missing username and password"})
    try{
        const user= await users.findOne({username})
        if(user)
        return res.status(400).json({success:false,message:"ten tai khoan da ton tai"})
        const hashedPassword=await argon2.hash(password)
        const newUser=new users({username,password:hashedPassword,role:0,createdUp:createdUp,Cm:true,Timeban:0,img:null})
        await newUser.save()
        const accesstoken=jwt.sign({userid:newUser._id,role:newUser.role,name:newUser.username,Cm:newUser.Cm,img:newUser.img},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'24h'
        })
        return res.json({success:true,message:"user created successfully",accesstoken})  
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
}
exports.login=async (req,res)=>{
    const {username,password,createdUp}=req.body
    if(!username || !password)
    return res.status(401).json({success:false,message:"Missing username and/or password"})
    try{
        const User= await users.findOne({username})
        if(!User)
        return res.status(400).json({success:false,message:"incorrect username or password"})
        const passwordValid= await argon2.verify(User.password,password)
        if(!passwordValid)
        return res.status(400).json({success:false,message:"incorrect  username or password"})
        const accesstoken=jwt.sign({userid:User._id,role:User.role,name:User.username,Cm:User.Cm,img:User.img},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'24h'
        })
        await users.updateOne({_id:User._id},{createdUp:createdUp})
        return res.json({success:true,message:"login in successfully",accesstoken})  
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"internal server error"})
    }
    
}
exports.verifytoken=(req,res)=>{
    const authHeader=req.header('Authorization')
    const Token=authHeader && authHeader.split(' ')[1]
    if(!Token)
    return res.status(401).json({success:false,message:"Access token not found"})
    try {
        const decode=jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
       
        res.json({success:true,user:decode})
    } catch (error) {
        console.log(error)
        res.status(403).json({success:false,message:"internal server error"})
    }
}   
