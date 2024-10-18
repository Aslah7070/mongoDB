const mongoose = require('mongoose');

// Replace this URL with your local MongoDB URL
const mongoURI = 'mongodb://localhost:27017/mySimpleDB';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch(err => console.log(err));

// Define a simple schema for a "User"
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Create and save a new user
async function createUser() {
  const user = new User({
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com'
  });

  // Save the user to the database
  await user.save();
  console.log('User created:', user);
}

// Call the createUser function
createUser();
