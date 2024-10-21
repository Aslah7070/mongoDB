
const express=require("express");
const app=express();
app.use(express.json());
const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/myUsers")
.then(()=>{
    console.log("connecting");
    
})
.catch((err)=>{
    console.log(err);
    
})


const productSchema=new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true},
    place:{type:String,required:true},
    age:{type:Number,required:true},
    phone:{type:Number,required:true},

})
const Users=mongoose.model("Users",productSchema)


app.post("/users",async(req,res)=>{
    try {
        // console.log(req.body.name);
    const users=new Users({
        name:req.body.name,
        email:req.body.email,
        place:req.body.place,
        age:req.body.age,
        phone:req.body.phone
    })
   let result= await users.save()
    res.send(result)
    } catch (error) {
        console.log("hello error",error);
        
    }
    
})

app.get("/users",async(req,res)=>{
    try {
       const users= await Users.find();
       res.send(users)
    } catch (error) {
        console.log(error);
        
    }
})

app.get("/users/:id",async(req,res)=>{
    try {
       const users= await Users.find();
       res.send(users)
    } catch (error) {
        console.log(error);
        
    }
})

app.listen(3000,()=>{
    console.log("stsrtefdm");
    
})