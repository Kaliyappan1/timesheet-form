const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');

const collection = require('./src/config');

const app = express();
// convert data into json format
app.use(express.json());

// body parser middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(express.static('src'))

// set ejs as view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/admin', (req, res) => {
    res.render('Adminlogin');
});
app.get('/timesheet', (req, res) => {
    res.render('timesheetData');
});
app.get('/form', (req, res) => {
  res.render('index');
});
app.get('/submitts', (req, res) => {
  res.render ('submit');
})
app.get('/login', (req, res) => {
  res.render('login');
})
app.get('/signup', (req, res) => {
  res.render('signup');
})

// signup form

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        re_password: req.body.re_password
    }; 
    // check if the user already exists in the database
  const existingEmail = await collection.users.findOne({ email: data.email});

  if(existingEmail) {
    res.send ("email already exists, please choose another email")
  }
  else {
    // hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const hashedre_Password = await bcrypt.hash(data.password, saltRounds);
    data.re_password = hashedre_Password
    data.password = hashedPassword;

    const userdata = await collection.users.insertMany(data);
    console.log(userdata);
    res.redirect('/login')
  }
})

// login
app.post('/login', async (req, res) => {
  try {
    const check = await collection.users.findOne({ email: req.body.email});
    if (!check) {
      res.send("email connot found");
    }

    // compare the hash password from the database with the plain text
    const PasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (PasswordMatch) {
    return res.redirect('/form')
    } else {
     return req.send("wrong password");
    }
  } catch (error) {
    console.error("Error", error);
    return res.status(500).send("wrong details");
  }
});

// admin login
app.post('/adminlogin',async (req,res) =>{
  try{
    const check = await collection.Adminlogin.findOne({ email: req.body.email});
    if(!check) {
      res.send ("invalid email,enter the corract emailname")
    }else{
      res.redirect("/timesheet");
    }
  }catch (err) {
    console.error("error: ", err);
    return res.status(500).send("wrong details")
  }
});

// form collect
app.post('/submit', async(req, res) => {
  const form = {
    name: req.body.name,
    date: req.body.date,
    attendance: req.body.attendance,
    hours: req.body.hours,
    description: req.body.description
  }
  const existingEntry = await collection.Timesheet.findOne(form)
  if(existingEntry) {
    res.send('this form already exist')
  }
  else{
  const userdata = await collection.Timesheet.insertMany(form);
  console.log(userdata);
  res.send('form submit successfully')
  console.log('timesheet submitted successfully')
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on:${port} >  http://localhost:${port}`);
});