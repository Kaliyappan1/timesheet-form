const mongoose = require('mongoose');
require('dotenv'). config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.URI);

        console.log(`MongoDB Connected successfully ${conn.connection.host}`);
    } catch (err) {
        console.log("can't connect to MongoDB");
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;