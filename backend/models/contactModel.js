const mongoose = require("mongoose");
const contactTable = mongoose.Schema({
    name : {
        type : String,
        require : [true,'Please Enter the Name']
    },
    email :{
        type : String,
        require : [true,'Please Enter the Email']
    },
    phone:{
        type : String,
        require : [true,'Please Enter the Phone']
    },
    created_by:{
        type : mongoose.Schema.ObjectId,
        require : true,
        ref : "User"
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('contacts',contactTable)