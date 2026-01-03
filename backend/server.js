const express=require("express");
const mongoose=require("mongoose")
mongoose.set("strictPopulate", false);

const dotenv=require("dotenv")
const cors=require("cors")
const app=express()
const authRoutes=require("./routes/authRoutes")
const userRoutes=require("./routes/userRoutes")
const postRoutes=require("./routes/postRoutes")

dotenv.config()

//middleware connection
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))

//route
app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/posts",postRoutes)
//db connection
console.log("Connecting Db...")
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected successfully")
}).catch((err)=>{
    console.log(err)
})

//start server
app.listen(process.env.PORT,(error)=>{
    if (!error){
        console.log("Server is running successfully on port"+process.env.PORT)
    }
    else{
        console.log("Error occured, the server can't start",error)
    }
})
