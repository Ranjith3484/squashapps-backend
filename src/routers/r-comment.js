const express = require('express')
const Comment = require('../models/comment')

const router = new express.Router()



//add
router.post('/add/new/comment', (req, res) => {
    const comment = new Comment(req.body)

    comment.save().then(() => {
        res.status(200).json({
            message: "Comment Added"
          })
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//get
router.get('/get/all/comment', (req,res) => {
    const id = req.headers['id']
    Comment.find ({"id" : id}).then((comments) =>{
        res.status(201).send(comments)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})




module.exports = router



