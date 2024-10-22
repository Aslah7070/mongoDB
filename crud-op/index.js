const express=require("express");
const mongoose=require("mongoose")
const app=express();
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/aslah").then(()=>{
    console.log('connected');
    
})
.catch((err)=>{
    console.log(err);
    
})

const mongooseSchema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    place:{type:String,required:true}
    
})
 const Users=mongoose.model("users",mongooseSchema)
app.get("/users",async(req,res)=>{
  const result= await Users.find()
  console.log(result);
  
  res.json(result)
    // const {name,age,place}=req.body;

})

app.post("/users",(req,res)=>{
   const {name,age,place}= req.body
   const result=new Users({
    name,
    age,
    place
   })
   result.save();
   res.send(`success    ${result}`)
})
app.put("/users/:id",async(req,res)=>{
   const id= req.params.id
   console.log(id);
   
   const {name,age,place}=req.body
   await Users.findByIdAndUpdate(id,{name,age,place},{new:true})
   res.send("dahd")
   
})
app.listen(3000,()=>{
    console.log("stsrt");
    
})