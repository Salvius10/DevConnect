const jwt=require("jsonwebtoken")

module.exports=function (req,res,next){
    try {
        const token=req.header("Authorization")
        if (!token) return res.status(401).json({msg:"No token, Authorization denied"})
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decode.id
        next()    
    } catch (err) {
        res.status(500).json({error:err.message})
    }
    
}