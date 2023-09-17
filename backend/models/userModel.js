const mongoose = require("mongoose");
const userTable = mongoose.Schema({
    username : {
        type : String,
        require : [true,'Please Enter the User Name']
    },
    email :{
        type : String,
        require : [true,'Please Enter the Email'],
        unique: [true, "Email address already taken"]
    },
    password:{
        type : String,
        require : [true,'Please Enter the password']
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('user',userTable)