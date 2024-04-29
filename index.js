const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.port || 7000;



// --------middleware------------
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ethrwxc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();

    const touristsSportCollection = client.db('touristsSportDB').collection('touristsSport');

    app.get('/addTouristsSport',async(req,res) =>{
        const cursor = touristsSportCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.post('/addTouristsSport',async(req,res) => {
        const newSport = req.body;
        console.log(newSport);
        const result = await touristsSportCollection.insertOne(newSport)
        res.send(result);

    })

    app.delete('/addTouristsSport/:id', async(req,res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await touristsSportCollection.deleteOne(query);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res) =>{
    res.send('Tourists management Web is running')
})

app.listen(port,() => {
    console.log(`tourists server is running on port:${port}`)
})