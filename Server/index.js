const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

const corsOption = {
  origin: ['http://localhost:5173'],
  credentials: true,
  optionSuccessStatus: 2000
};

// middleware
app.use(cors(corsOption));
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4qgkjzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const jobCollection = client.db('soloSphereDB').collection('jobs');
    const bidCollection = client.db('soloSphereDB').collection('bids');


    // job related api
    app.get('/jobs', async (req, res) => {
      
      const result = await jobCollection.find().toArray();
     res.send(result)
    })

    app.get('/job/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await jobCollection.findOne(query);
      res.send(result)
    })

    app.get('/jobs/:email', async (req, res) => {
      const email = req.params.email;
      const query = {'buyer.email': email}

      const result = await jobCollection.find(query).toArray();
      res.send(result)
    })

    app.post('/jobs', async (req, res) => {
      const jobData = req.body;

      console.log(jobData)
      

      const result = await jobCollection.insertOne(jobData);

      res.send(result);
    });

    app.put('/job/:id', async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const query = { _id: new ObjectId(id) }
      const options = { upsert: true };

      const updatedDoc = {
        $set: {
          ...jobData
        }
      }

      const result = await jobCollection.updateOne(query, updatedDoc, options)

      res.send(result)
    })

    app.delete('/job/:id', async (req, res) => {
      const id = req.params.id;
      
      const query = { _id: new ObjectId(id) };

      const result = await jobCollection.deleteOne(query)
      res.send(result)
    }) 

    // bids related api
    app.get('/my-bids/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await bidCollection.find(query).toArray();

      res.send(result)
    })
    
    app.get('/bid-request/:email', async (req, res) => {
      const email = req.params.email;
      const query = { buyer_email: email };

      const result = await bidCollection.find(query).toArray();

      res.send(result)
})

    app.post('/bids', async (req, res) => {
      const bidData = req.body;

      const result = await bidCollection.insertOne(bidData);

      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);



app.get('/', async (req, res) => {
  res.send('soloSphere server is running')
})

app.listen(port, () => {
 console.log(`server is running on port ${port}`);
})