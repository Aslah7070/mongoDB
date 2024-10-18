const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/crud_example')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));


  const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true }
  });
                                            
  const Product = mongoose.model('Product', productSchema);



  app.post('/products', async (req, res) => {
    try {
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        inStock: req.body.inStock
      });
      const result = await product.save();
      res.send(result);
    } catch (error) {
      res.status(400).send(`helooo ${error.message}`);
    }
  });

  app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.send(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  
  app.put('/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          price: req.body.price,
          inStock: req.body.inStock,
        },
        { new: true } // Return the updated document
      );
      if (!product) return res.status(404).send('Product not found');
      res.send(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  
  app.delete('/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).send('Product not found');
      res.send(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
    

  app.listen(3000,()=>{
    console.log("started");
    
  })