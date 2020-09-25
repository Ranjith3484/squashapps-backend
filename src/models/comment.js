const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    time:{
        type:String
    },
    createdBy:{
        type:String
    },
    id:{
        type:String
    }

})

const Comment= mongoose.model('Comment', commentSchema)




module.exports = Comment