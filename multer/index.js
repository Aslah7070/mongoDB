const express=require("express");
const app=express();

const multer=require("multer")
const storage=multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>cb(null,file.originalname)
})
const uploader=multer({storage})
app.post("/upload",uploader.single("file"),(req,res)=>{
    res.send("hello")
})
app.listen(3000,()=>{
    console.log("started");
    
})