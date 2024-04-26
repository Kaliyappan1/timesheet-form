const mongoose = require("mongoose");
require('dotenv').config()
const connect = mongoose.connect(process.env.URI);

// check database connected or not
connect.then(() => {
    console.log("database connected successfully");
})
.catch(() => {
    console.log("database cannot be connected");
});

// schemas

// loginschema
const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Login = mongoose.model('login_form', LoginSchema);

// signup

// timesheetschema
const timesheetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    attendance: {
        type: [{
          type: String,
          enum: ['Working', 'Delay', 'Leave']
        }],
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Timesheet = mongoose.model('timeSheet_form', timesheetSchema);

module.exports = {
    Login,
    Timesheet
}