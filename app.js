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
app.post('/timesheet', async (req, res) => {
    collection.Timesheet.find({})
    .then((x) => {
      res.render('timesheetData', {x})
    })
    .catch((sheet) => {
      
    })
});

// delete timesheet id
app.post('/delete/:id', async (req, res) => {
  try {
      const dlt = await await collection.Timesheet.deleteOne({_id: req.query.id});
      if (!dlt) {
        return res.status(404).send("not found.");
    }
    res.send("deleted successfully.");
  } catch (error) {
      res.status(500).send(error.message);
  }
});

app.get('/popup', (req, res) => {
  res.render('popupbtn');
});

app.get('/form', (req, res) => {
  res.render('index');
});
app.get('/adminDashboard', (req, res) => {
  res.render('Adminhome');
});

app.get('/login', (req, res) => {
  res.render('login');
})
app.get('/signup', (req, res) => {
  res.render('signup');
})

app.get('*', (req,res) => {
  res.render('404')
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
    res.send ("<h1>email already exists</h1>")
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
      res.send("<h1>  email connot found</h1>");
    }

    // compare the hash password from the database with the plain text
    const PasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (PasswordMatch) {
    return res.redirect('/form')
    } else {
     return res.send("<h1>wrong password</h1>");
    }
  } catch (error) {
    console.error("Error", error);
    return res.status(500).send("<h1>wrong details</h1>");
  }
});

// admin login
app.post('/adminlogin',async (req,res) =>{
  try{
    const check = await collection.Adminlogin.findOne({ email: req.body.email, password: req.body.password});
    if(!check) {
      res.send ("<h2>Enter corract email or password</h2>")
    }else{
      res.redirect("/timesheet");
    }
  }catch (err) {
    console.error("error: ", err);
    return res.status(500).send("<h1>wrong details</h1>")
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
    res.send('<h1>this form already exist</h1>')
  }
  else{
  const userdata = await collection.Timesheet.insertMany(form);
  res.send('<h1>form submit successfully</h1>')
  console.log('timesheet submitted successfully')
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running on:${port} >  http://localhost:${port}`);
});