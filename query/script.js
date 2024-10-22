const express=require("express");
const app=express()
app.get("/",(req,res)=>{
    const {category,type}=req.query;
    res.send(`category ${category} type ${type}`)
    
})
app.listen(3000,()=>{
    console.log("dadads");
    
})