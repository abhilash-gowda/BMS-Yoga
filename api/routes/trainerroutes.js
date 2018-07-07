const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Trainer = require("../models/trainer");


var minuteFromNow = function(){
  var d = new Date();
   d.setHours(d.getHours() + 5);
 d.setMinutes(d.getMinutes() + 30);
   var n = d.toLocaleString();
 return n;
};





router.post("/signup", (req, res, next) => {
    Trainer.find({ email: req.body.email })
  //checking if email exists in db already
    .exec()
    .then(trainer => {
      if (trainer.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const trainer = new Trainer({
              _id: new mongoose.Types.ObjectId(),
              f_name:req.body.f_name,
              m_name:req.body.m_name,
              l_name:req.body.l_name,
              username:req.body.username,
              email: req.body.email,
              phone:req.body.phone,
              password: hash,
              
              
            });
            trainer
              .save()
              .then(result => {
                console.log(result),
                Trainer.update({email:req.body.email},{$set : { creation_time : minuteFromNow()}},function(err) {
                  if(err) 
                  {
                     throw err;
                  }
                 } )
                res.status(201).json({
                  message: "trainer profile created"
                  
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});


router.post("/login", (req, res, next) => {
    Trainer.find({ email: req.body.email })
      .exec()
      .then(trainer => {
        if (trainer.length < 1) {
          return res.status(401).json({
            message: "LOGIN FAILED"
          });
        }
        //comaprision with existing mails==pwd in db
        bcrypt.compare(req.body.password, trainer[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "LOGIN FAILED"
            });
          }
          if (result) {
            Trainer.update({email:req.body.email},{$set : { lastLogin : minuteFromNow()}},function(err) {
                if(err) 
                {
                   throw err;
                }
               } )
            return res.status(200).json({
              message: "LOGIN SUCCESSFUL",
            });
          }
          res.status(401).json({
            message: "LOGIN FAILED"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  module.exports = router;
