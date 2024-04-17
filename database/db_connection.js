const mongoose = require('mongoose');
const router = express.Router();
require('dotenv').config();

// mongodb connection url
const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

// connect to MongoDB
mongoose.connect()

mongoose.connect(mongoURL).then (() => {
    console.log("Database is connected successfully");
}).catch(err => {
    console.log(err);
})