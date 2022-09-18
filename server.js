const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const indexRoute = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');

const uri =
  'mongodb+srv://swap:swap@cluster0.7bfwuan.mongodb.net/cvBuilder?retryWrites=true&w=majority';

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB');
  } catch (error) {
    console.error('connection error', error);
  }
}

connect();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(logger("combined"));

app.get('/', (req, res) => {
  res.send('Neo assesment');
});

app.use('/api', indexRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
