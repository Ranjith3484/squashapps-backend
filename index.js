const express = require('express');

const userrouter = require('./src/routers/r-user');
const announcementrouter = require('./src/routers/r-announcement');
const commentrouter = require('./src/routers/r-comment');

const morgan = require('morgan');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ranjith:ranjith@cluster0.gzgl4.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log('DB Connected')
})

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(userrouter);
app.use(announcementrouter);
app.use(commentrouter);




const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})