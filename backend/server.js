const express=require("express");
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const app=express()

dotenv.config()

//middleware connection
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))

//route
app.get('/',(req,res)=>{
    res.status(200).send("Welcome to the root URL of the server")
})

//db connection
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
