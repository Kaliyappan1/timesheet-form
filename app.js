const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const connectDB = require('./database/db_connection');
const Sheema = require('./database/timesheetModels');

const app = express();

// connect to MongoDb
connectDB();

// body parser middleware
app.use(express.json());
app.use(express.static('public'))

// route form submission
app.post('./', async (req, res) => {
    try {
        const { name, date, attendance, hours, description } = req.body;

        // create new timesheet record
        const timesheet = new Sheema({
            name: name,
            date: date,
            attendance: attendance,
            hours: hours,
            description: description
        });

        // save to database
        const data = await timesheet.save();

        res.status(201).send('timesheet submitted successfully');
    }catch (err) {
        console.log("can't save timesheet form");
        console.error(err.message);
        res.status(500).send('timesheet submission failed');
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port: ${port} >  http://localhost:${port}`);
});