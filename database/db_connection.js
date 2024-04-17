const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
require('dotenv').config();

// mongodb connection url
const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

// connect to MongoDB
mongoose.connect(url).then (() => {
    console.log("Database is connected successfully");
}).catch(err => {
    console.log(err);
})

// define schema and model
const Schema = new mongoose.Schema({
    

});
const FormData = mongoose.model('users', Schema);

// middleware to parse incoming form data
router.use(bodyParser.urlencoded());

router.post('/firstPage', (req, res) => {
    const formData = req.body;

    // save form data into mongodb
    const newFormData = new FormData(formData);
    newFormData.save()
    .then(() => {
        res.sendStatus(200);
    })
    .catch(err => {
        console.error('error saving form data to mongodb', err);
        res.sendStatus(500);
    })
})

module.exports = router;