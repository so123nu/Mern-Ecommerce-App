const mongoose = require('mongoose');
require('dotenv').config();
require('colors');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`mongo db connected ${conn.connection.host}`.blue.underline)

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = { connectDB }