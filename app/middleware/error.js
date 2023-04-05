const ApiError=require("../apierror")
exports.error=(req,res,next)=>{
    return next(new ApiError("Resource not found",404))
}
exports.handleError=(err,req,res,next)=>{
    return res.status(err.statusCode|| 500).json({
        message:err.message ||  "Internal Server Error",
    })
}