const express = require('express')
const Announcement = require('../models/announcement')

const router = new express.Router()
const nodemailer = require('nodemailer');



//add
router.post('/add/new/announcement', (req, res) => {
    const announcement = new Announcement(req.body)

    announcement.save().then(() => {
        res.status(200).json({
            message: "Announcement Sended"
          })
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'gururanjith425@gmail.com',
              pass: 'ranjith@425'
            }
          });
      
          var mailOptions = {
            from: 'gururanjith425@gmail.com',
            to: req.body.notify,
            subject: req.body.subject,
            text: req.body.description
          };
      
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//get
router.get('/get/all/announcement', (req,res) => {
    const id = req.headers['id']
    Announcement.find ({"createdBy" : id}).then((announcements) =>{
        res.status(201).send(announcements)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})

//updating comments
router.put("/update/comments/in/announcements", async (req, res) => {
  try {
    let announcement = await Announcement.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          comments:req.body.comment
        }
      },
      { upsert: true }
    );
    res.status(200).json({
      message: "Comment Updated"
    });
    console.log(req.body.id)
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});



module.exports = router



