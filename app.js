const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');

const collection = require('./src/config');

const app = express();

// body parser middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(express.static('src'))

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
app.use('submitts', (req, res) => {
  res.send ('submit');
})

// signup form

app.post('/signup', async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }; 
    // check if the user already exists in the database
  const existingEmail = await collection.findOne({ email: data.email});

  if(existingEmail) {
    res.send ("email already exists, please choose another email")
  }
  else {
    // hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    const userdata = await collection.insertMany(data);
    console.log(userdata);
    res.send('signup successfully');
    res.redirect('/login');
  }
})

// login
app.post('/login', async (req, res) => {
  try {
    const check = await collection.findOne({ email: req.body.email});
    if (!check) {
      res.send("email connot found");
    }

    // compare the hash password from the database with the plain text
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.render("index");
    } else {
      req.send("wrong password");
    }
  } catch (error) {
    loggers.error(error);
    console.error("Error", error);
    return res.status(500).send("wrong details");
  }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on:${port} >  http://localhost:${port}`);
});