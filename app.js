const express = require('express');

const bodyParser = require('body-parser');
// const db_connection = require('./database/db_connection');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(express.static( 'public'));
// app.use(db_connection);



app.listen(port, (err, res) => {
    console.log(`listening on port: ${port} >  http://localhost:${port}`);
});