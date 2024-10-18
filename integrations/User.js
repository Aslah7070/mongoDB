const mongoose=require("mongoose")

const addressSchema=new mongoose.Schema({
    street:String,
    city:String
})
const userSchema=new mongoose.Schema({
    name:String,
    age:{
       type: Number,
       min:1,
       max:100,
       validate:{
        validator :v=>v%2===0,
        messsage:props=>`${props.value} is not an even number`
       }
    },
    email:{
        type:String,
        requireed:true,
        lowercase:true,
        minlength:10

    },
    ceratedAt:{
        type:Date,
        immutable:true,
        default: ()=>new Date(),

    },
    updatedAt:{
       type: Date,
       type:Date,
       default: ()=>new Date(),
    },
    bestFriend:{
       type: mongoose.SchemaTypes.ObjectId,
       ref:"User"
    },
    hobbies:[String],
    address:addressSchema
})
userSchema.methods.sayHi=function (){
    console.log(`my name is ${this.name}`);
    
}
userSchema.statics.findName=function (name){
    return this.where({name:new RegExp(name,"i")})
    
}
userSchema.query.byName=function (name){
    return this.where({name:new RegExp(name,"i")})
    
}
userSchema.virtual("namedEmail").get(function(){
    return `${this.name}<${this.email}>`
})
  
userSchema.pre("save",function (next){
    this.updatedAt=Date.now()
    throw new Error("Fail Save")
    // next()
})
userSchema.post("save",function (doc,next){
    doc.sayHi()
    next()
})
module.exports=mongoose.model("User",userSchema)
