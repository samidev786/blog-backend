const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect(process.env.conn_string)
    console.log('database connected');
}

module.exports = connectDB;