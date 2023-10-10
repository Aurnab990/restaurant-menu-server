import express,{Express, Response, Request} from "express";
const cors = require('cors');
import { MongoClient, ServerApiVersion,Collection, Db } from 'mongodb';
const port = process.env.PORT || 5000;
const app:Express = express();


const uri = 'mongodb+srv://newdata:hAC0Qp8JViZ7dFyn@cluster0.pg0uckr.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
    let clientConnected = false;
  
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      clientConnected = true;
  
      // Send a ping to confirm a successful connection
      const db: Db = client.db('devhouse');
      const shirtsCollection: Collection = db.collection('shirts');
      
  
      app.get('/shirts', async (req: Request, res: Response) => {
        const query = {};
        const cursor = shirtsCollection.find(query);
        const shirts = await cursor.toArray();
        res.send(shirts);
      });
    } catch (error) {
      console.error(error);
    } finally {
      if (clientConnected) {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
  }

app.get('/',(req:Request,res:Response)=>{
    res.send("Server is running on my pc my pc");
})

app.listen(port, ()=>{
    console.log(`Hello server connected on ${port}`);
    console.log("Good Work Developer");
})