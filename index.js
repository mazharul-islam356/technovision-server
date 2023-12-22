
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5001;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
app.use(express.json())
app.use(cors())





const uri = "mongodb+srv://mazharulislam3569:MrsoVdRxy9sbGf6S@cluster0.g6w7dmc.mongodb.net/?retryWrites=true&w=majority";

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
    const taskCollection = client.db("technovisionDB").collection("tasks");


    app.post('/todo', async (req, res) => {
      const task = req.body
      const result = await taskCollection.insertOne(task)
      res.send(result)
    })


    app.get('/todo', async (req, res) => {
      const result = await taskCollection.find().toArray()
      console.log(result)
      res.send(result)
    })
  

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Task management server is Running')
})

app.listen(port, () => {
  console.log( ` this port is running: ${port}`)
})