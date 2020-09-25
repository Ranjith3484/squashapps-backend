const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        firstname: {
            type: String,
        },
        lastname: {
            type: String,
        },
        email: {
            type: String,
            unique:true,
            required:true,
        },
        code:{
            type:String
        },
        password: {
            type: String,
        },
        companyname: {
            type: String,   
        },
        location: {
            type: String,   
        },
        employee: {
            type: String,   
        },
        domain: {
            type: String,   
        }
    })


const User = mongoose.model('User', userSchema )




module.exports = User