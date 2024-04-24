const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded());
app.use(express.static( 'public'));
// app.use(db_connection);


const port = process.env.PORT || 3000;
app.listen(port, (err, res) => {
    console.log(`listening on port: ${port} >  http://localhost:${port}`);
});