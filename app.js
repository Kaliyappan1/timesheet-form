const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(express.static( 'public'))


app.listen(port, (err, res) => {
    console.log(`listening on port: ${port} >  http://localhost:${port}`);
});