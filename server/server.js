const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const port = 3001

//Middleware 
app.use(cors({origin: 'http://localhost:3000',credentials: true}))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const routes = require('./routes/Route')
app.use("/api/v1/", routes)


// Mongoose configuration
mongoose.connect(`${process.env.DATABASE_CONNECTION}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Database connected to Mongoose');
  })
  .catch((err) => {
    console.error('Error connecting to Mongoose:', err);
  });


app.listen(port, () => {
    console.log('listening on port', port);
})