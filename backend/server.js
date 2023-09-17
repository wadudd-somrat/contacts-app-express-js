const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbconnection");
const dotenv = require("dotenv").config();

const contactRoutes = require("./router/contactRoutes");
const userRoutes = require("./router/userRoute");
const app = express();

const  port = process.env.PORT || 5000;
connectDB();
app.use(express.json());///for body data

app.route('/').get((req,res) => {
    res.status(200).json({message: 'wellcome to Contact Information'});
});
app.use(errorHandler);
app.use('/api/contacts',contactRoutes);
app.use('/api/users',userRoutes);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
