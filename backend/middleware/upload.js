const multer=require("multer")
const path=require("path")

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,"uploads/")
    },
    filename:function (req,file,cb){
        cb(
            null,
            Date.now()+"-"+file.originalname.replace(/\s/g,"_")
        )
    }
})

const fileFilter=(req,file,cb)=>{
    const allowed=["image/jpeg","image/jpg","image/png"]
    if (allowed.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("Invalid file type.Only JPG and PNG allowed"),false)
    }

}

module.exports=multer({storage,fileFilter})