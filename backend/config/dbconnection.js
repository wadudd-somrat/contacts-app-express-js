const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
       // console.log("Database connected host:",connect.connection.host);
       // console.log("Database Name",connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

}

module.exports = connectDB;