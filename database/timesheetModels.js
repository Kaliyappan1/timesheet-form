const mongoose = require('mongoose');

// create schema
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

const Timesheet = mongoose.model('users', timesheetSchema);

module.exports = Timesheet;