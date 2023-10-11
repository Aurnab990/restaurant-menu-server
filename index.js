"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();

app.use(cors());
app.use(express.json());



const uri = 'mongodb+srv://newdata:hAC0Qp8JViZ7dFyn@cluster0.pg0uckr.mongodb.net/?retryWrites=true&w=majority';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const itemsCollection = client.db('devhouse').collection('dishes');
   
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    app.get('/items', async(req,res)=>{
      const query = {};
      const cursor = itemsCollection.find(query);
      const items = await cursor.toArray();
      res.send(items);

    });
    app.get('/items/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const items = await itemsCollection.findOne(query);
      res.send(items);

    });//delete product
    app.delete('/items/:id', async(req, res)=>{
      const id = (req.params.id);
      const query = {_id:new ObjectId(id)};
      const result = await itemsCollection.deleteOne(query);
      res.send(result);
    });
    //Update Product
    app.get('/items/:id', async(req, res)=>{
      const id = (req.params.id);
      const query = {_id:new ObjectId(id)};
      const result = await itemsCollection.findOne(query);
      res.send(result);
    });

    app.put('/items/:id', async(req, res) =>{
      const id = req.params.id;
      const updateItem = req.body;
      const query = {_id:new ObjectId(id)};
      const options= { upsert: true};
      const updatedDoc ={
        $set: {
          title: updateItem.title,
          price: updateItem.price,
          inStock: updateItem.available
        }
      };
      const result = await itemsCollection.updateOne(query, updatedDoc, options);
      res.send(result);
      
    })
    

    app.post('/items', async(req, res) =>{
      console.log("Request", req.body);
      const newItem = req.body;
      
      
     /* item.id = items.length+1;
    
      items.push(item);*/
      const result = await itemsCollection.insertOne(newItem);
      res.send(result);
    });


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Server is running on my pc");
});
app.listen(port, () => {
    console.log(`Hello server connected on ${port}`);
});
