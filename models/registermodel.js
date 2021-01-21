const mongoose =require('mongoose')
const registerSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    emailid:{
        type: String,
        required : true,
        unique : true
    },
    password:{
        type: String,
        required: true
    },
})

const Register = new mongoose.model("register",registerSchema);

module.exports = Register;