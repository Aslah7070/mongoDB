const express=require("express");
const app=express();
const mongoose=require("mongoose")
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/CRUD')
.then(()=>{
    console.log("connecting");
    
}).catch((err)=>{
    console.log(err);
    
})
const ProductSchema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    place:{type:String,required:true},

})
const Person=mongoose.model('Person',ProductSchema);




app.post("/persons",async(req,res)=>{
   try {
    const person =new Person({
        name:req.body.name,
        age:req.body.age,
        place:req.body.place
    })
    const result=await person.save();
    res.send(result)
   } catch (error) {
    console.log(error);
    
   }

})
app.get("/persons",async(req,res)=>{
       try {
        const result=await Person.find()
       res.send(result)
       } catch (error) {
        console.log(error);
        
       }
})

app.put("/persons/:id",async (req,res)=>{
  try {
    const updatedPerson= await Person.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            age:req.body.age,
           place: req.body.place
        },
        {new:true}
    )
    if(!updatedPerson)return res.status(404,console.log("user not found") )
        res.send(updatedPerson) 
  } catch (error) {
    console.log(error);
    
  }
    
})

app.delete("/persons/:id",async (req,res)=>{
    const result =await Person.findByIdAndDelete(req.params.id);
    if(!result)return res.status(404,console.log("not found"))
        res.send(result)
})

app.listen(3000,()=>{
    console.log("startinnng");
    
})