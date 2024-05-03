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


// user
const user = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    re_password: String
});
const users = mongoose.model('usersLogin', user)

// Adminlogin
const AdminloginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const Adminlogin = mongoose.model('adminlogin', AdminloginSchema)

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
        type: String,
        enum: ['Working', 'Delay', 'Leave'],
        required: true
    },
    hours: {
        type: Number,
        min: 3,
        max: 13,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
const Timesheet = mongoose.model('timeSheet_form', timesheetSchema);

module.exports = {
    users,
    Adminlogin,
    Timesheet

    
}