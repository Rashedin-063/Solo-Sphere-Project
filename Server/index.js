const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

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
app.use(cookieParser())

// custom middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

   if (!token) return res.status(401).send({ message: 'Unauthorized' });

   jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
     if (error) {
       console.log(error)
       
       return res.status(401).send({ message: 'Unauthorized access' });
     }
     req.user = decoded.email;
     
     console.log(decoded.email)
     
     return next();
   });
 
}

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

    // auth related api
    app.post('/jwt', async (req, res) => {
      const loggedUser = req.body
console.log(loggedUser)

      const token = jwt.sign(loggedUser, process.env.ACCESS_TOKEN, {
       expiresIn: '7d'
})

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        })
        .send({success: true});
    })

    // clear token on logout
    app.get('/logout', (req, res) => {
    
      res
        .clearCookie('token', {
         maxAge: 0
        })
        .send({ success: true });
    })


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

    app.get('/jobs/:email', verifyToken, async (req, res) => {
    
      const tokenEmail = req.user

      const email = req.params.email;

      if (tokenEmail !== email) {
        return res.status(403).send({message: 'Forbidden Access'})
      }

      
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
    app.get('/my-bids/:email', verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await bidCollection.find(query).toArray();

      res.send(result)
    })
    
    app.get('/bid-request/:email', verifyToken, async (req, res) => {
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

    // update bid request
    app.patch('/bid/:id', async (req, res) => {
      const id = req.params.id;

      const status = req.body;

      console.log(status)
      

      const query = { _id: new ObjectId(id) }
      
      const updatedDoc = {
        $set: status
      }

      const result = await bidCollection.updateOne(query, updatedDoc);

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