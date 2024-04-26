const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');

const connectDB = require('./src/db_connection');
const collection = require('./src/timesheetModels');

const app = express();

// body parser middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
// connect to MongoDb
connectDB();

// set ejs as view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login');
});
app.get('/form', (req, res) => {
    res.render('index');
});
app.get('/admin', (req, res) => {
    res.render('Adminlogin');
});
app.post('/timesheet', (req, res) => {
    res.render('timesheetData');
});

// route login submission

app.post('/signup', async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    // check if the user already exists in the database
  const existingUser = await collection.findOne({ username: data.username });
  if (existingUser) {
    res.send("user already exists. please choose a different username.");
  } else {
    // hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    const userdata = await collection.insertMany(data);
    console.log(userdata);
    res.send('signup successfully');
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on:${port} >  http://localhost:${port}`);
});