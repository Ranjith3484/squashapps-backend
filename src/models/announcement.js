const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    notify: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    time:{
        type:String
    },
    location:{
        type:String
    },
    expireson:{
        type:String
    },
    createdAt:{
        type:String
    },
    createdTime:{
        type:String
    },
    createdBy:{
        type:String
    },
    comments:{
        type:Number
    }

})

const Announcement= mongoose.model('Announcement', announcementSchema)




module.exports = Announcement