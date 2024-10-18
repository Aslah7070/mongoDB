// const express=require("express");
// const app=express()
const User=require("./User")
const MongoClient = require('mongoose')

MongoClient.connect('mongodb://localhost:27017/testingDB') .then(()=>{
  console.log("connected");
  run()

  
async function run(){
    // User.findById().save()

   try {
    // const user= await User.findOne({name:"ajin"})
    // const user= await User.findName("ajin")
    const user= await User.findOne({name:"ajin"})
    console.log(user);
    await user.save()
   
    
    // console.log(user.namedEmail)

    
   
    // user.sayHi()
    // const user= await User.where("age").gt(12).where("name").equals("ajin").populate("bestFriend").limit(1)
    // .select("age")
    // user[0].bestFriend="6712597b5d225dfc056b9161"
    // await user[0].save()
    console.log(user);
    
    // const  user=await User.create({
    //     name:"ajin",
    //     age:20,
    //     email:"dsmail.com",
    //     hoobbies:["wheight lifting","Bowling"],
    //     address:{
    //         street:"mainst"
    //     }
    // })
    //    user.ceratedAt=54;
    //    await user.save()
    
    //     const user=new User({name:"aslah",age:22})
    //    await user.save()
    //    console.log(user);

    //  const user = await User.findById('671246a1b143beb16143973b')
    //  console.log(user);
     
   } catch (error) {
    console.log(error.message);
    
   }
   
}
}).catch((err)=>{ 
console.log(err);




})



// const User = require("./User");  // Assuming this is your Mongoose model
// const mongoose = require('mongoose');

// // Connect to MongoDB (specifying the database name 'testDB')
// mongoose.connect('mongodb://localhost:27017/testingDB', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to MongoDB");

//     // Call the function to send data after successful connection
//     run();
//   })
//   .catch((err) => {
//     console.log("Error connecting to MongoDB:", err);
//   });

// // Async function to create and save the user
// async function run() {
//   try {
//     // Create a new user with the provided data
//     const user = await User.create({
//       name: "ajinks",
//       age: 20,
//       email: "ajindsmail@example.com",  // Use a valid email format
//       hobbies: ["weight lifting", "bowling"],  // Typo fixed: 'weight' instead of 'wheight'
//       address: {
//         street: "main st"
//       }
//     });

//     // You can modify the user document if necessary (e.g., setting createdAt manually)
//     user.createdAt = Date.now();  // Setting createdAt field manually

//     // Save the updated user document to the database
//     await user.save();

//     // Print the saved user document to the console
//     console.log("User saved:", user);
//   } catch (error) {
//     // Catch and log any errors
//     console.log("Error saving user:", error);
//   }
// }

