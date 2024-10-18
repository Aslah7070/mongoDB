const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/populate_example')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));


// Author Schema
const authorSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });
  
  // Book Schema (references the Author)
  const bookSchema = new mongoose.Schema({
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }, // Reference to Author
  });
  
  // Models
  const Author = mongoose.model('Author', authorSchema);
  const Book = mongoose.model('Book', bookSchema);

  
  // Create a new author
app.post('/authors', async (req, res) => {
    const author = new Author({
      name: req.body.name,
      age: req.body.age,
    });
  
    try {
      const result = await author.save();
      res.send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  // Create a new book with reference to an author
  app.post('/books', async (req, res) => {
    const book = new Book({
      title: req.body.title,
      author: req.body.authorId, // Pass the author ID in the request
    });
  
    try {
      const result = await book.save();
      res.send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  

  // Get all books and populate the author field
app.get('/books', async (req, res) => {
    try {
      const books = await Book.find().populate('author'); // Populate the author field
      res.send(books);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  app.get("/authors",async(req,res)=>{
    const auther=await Author.find()
    res.send(auther)
  })
  app.delete("/authors/:id",async(req,res)=>{
  const result= await Author.findByIdAndDelete(req.params.id);
  res.send(result)
  })

  app.delete("/books/:id",async(req,res)=>{
    const result= await Book.findByIdAndDelete(req.params.id);
    res.send(result)
    })

  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
  