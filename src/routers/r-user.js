const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer');

const router = new express.Router()

//users insert

router.post('/user/register/sending/code', (req, res) => {

  const CODE = Math.floor(100000 + Math.random() * 900000)
  const user = new User({
    email: req.body.email,
    code: CODE
  })


  user.save().then(() => {
    res.status(200).json({
      message: "Code Sended",
      email:user.email
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
      to: req.body.email,
      subject: 'SA-INTRANET account verification',
      text:
        "Hi," + " " + "your account was successfully created using" + " " + user.email+ ", "
        + "and your verification code is" + ", " + CODE + '\n\n'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }).catch((e) => {
    res.status(400).json({
      message: user.email+" is already taken"
    })
  })
})

//vaidate code
router.post("/validate/code", (req, res, next) => {
const code = req.body.code
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
         res.status(401).json({
          message: "invalid Email"
        });
      }else{
         if(code === user[0].code){
           res.status(401).json({
            message: "Valid code"
          });
         }else{
           res.status(401).json({
            message: "Invalid code"
          });
         }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//login

router.post("/login", async(req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
       return res.status(401).json({
          message: "invalid Email"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
       return  res.status(401).json({
            message: "Incorrect Password"
          });
        }
        if (result) {

          const token = jwt.sign({ email: user[0].email }, 'emal');

        return  res.status(200).json({
            message: "Login successful",
            token: token,
            userid: user[0]._id,
            name: user[0].firstname,
            email:user[0].email
          });
        }
        res.status(401).json({
          message: "Incorrect Password"
        });
      });
    })
    .catch(err => {
      console.log(err);
    return  res.status(500).json({
        error: err
      });
    });
});

//resend code
router.put("/resend/code", async (req, res) => {
  try {
    var CODE = Math.floor(100000 + Math.random() * 900000)
    let user = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          code:CODE
        }
      },
      { upsert: true }
    );
    res.status(200).json({
      success: true,
      message: "Verification code sended"
    });
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gururanjith425@gmail.com',
        pass: 'ranjith@425'
      }
    });

    var mailOptions = {
      from: 'gururanjith425@gmail.com',
      to: req.body.email,
      subject: 'SA-INTRANET account verification',
      text:
        "Hi," + " " + "your account was successfully created using" + " " + req.body.email+ ", "
        + "and your verification code is" + ", " + CODE + '\n\n'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (err) {
    res.status(500).json({
      success: "failure",
      message: err.message
    });
  }
});

//setting profile
router.put("/setting/up/profile", async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          company:req.body.company,
          location:req.body.location,
          employee:req.body.employee,
          domain:req.body.domain,
        }
      },
      { upsert: true }
    );
    res.status(200).json({
      message: "Profile Setted"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//setting profile
router.put("/setting/up/password", async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          password:await bcrypt.hash(req.body.password, 8)
        }
      },
      { upsert: true }
    );
    res.status(200).json({
      message: "Done"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});
module.exports = router



