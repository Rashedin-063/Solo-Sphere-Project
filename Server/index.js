const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

const corsOption = {
  origin: ['http://localhost:5173/'],
  credentials: true,
  optionSuccessStatus: 2000
};

app.use(cors(corsOption));
app.use(express.json());


app.get('/', async (req, res) => {
  res.send('soloSphere server is running')
})

app.listen(port, () => {
  `server is running on port ${port}`;
})