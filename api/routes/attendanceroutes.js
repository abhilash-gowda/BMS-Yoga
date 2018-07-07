const express = require("express");
const router = express.Router();
const moment = require('moment');
const mongoose = require('mongoose');

const Attendance = require('../models/attendance');

// time of attendance taken

var minuteFromNow = function()
{
  var d = new Date();
   d.setHours(d.getHours() + 5);
 d.setMinutes(d.getMinutes() + 30);
   var n = d.toLocaleString();
 return n;
};



//router.post("/markattendance", (req, res, next) => {

/*
  Attendance.find({ email: req.body.email })
  //checking if email exists in db already
    .exec()
    .then(attendance => {
      if (attendance.length >= 1) {
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

*/
/*
            const attendance = new Attendance({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              package: req.body.package,
              attendance_count:req.body.attendance_count
            });
            attendance
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "NAME REGISTERED IN ATTENDANCE TAB"
                  
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          });
          */

          /*
        });
      }
    });
});

*/



router.post("/markattendance", (req, res, next) => {
  Attendance.find({ email: req.body.email })
    .exec()
    .then(attendance => {
      if (attendance.length >= 1) {
        return res.status(409).json({
          message: "EMAIL ALREADY EXISTS"
        });
      }  else {
            const attendance = new Attendance({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              package: req.body.package,
              attendance_count:req.body.attendance_count
            });
            attendance
              .save()
              .then(result => {
                console.log(result);
                
                res.status(201).json({
                  message: "NAME REGISTERED IN ATTENDANCE TAB"
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
});





// function to add attendance count in db


router.post("/attendancecount", (req, res, next) => {
  Attendance.find({ email: req.body.email })
    .exec()
    .then(attendance => {
      if (attendance.length < 1) {
        return res.status(401).json({
          message: "INVALID USER"
        });
      }
      //comaprision with existing mails==pwd in db
        
          
          Attendance.update({email:req.body.email},{$inc: {attendance_count : 1}},function(err) {
            
            if(err) 
            {
               throw err;
            }
           } )

           Attendance.update({email:req.body.email},{$set : { lastLogin : minuteFromNow()}},function(err) {
            if(err) 
            {
               throw err;
            }
           } )
          return res.status(200).json({

            message: "attendance updated",
            
            
          }  
        );
          res.status(401).json({
          message: "LOGIN FAILED"
        });
    
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});








router.get("/getbymonth", (req, res, next) => {
  var month = req.body.month;
  var year = req.body.year;
    //get starting and ending dates of the month
    var startDate = moment([year, month]).add(-1,"month");
    // Clone the value before .endOf()
    var endDate = moment(startDate).endOf('month');
    // console.log("year month vales",startDate.toDate().toString(),endDate.toDate().toString());



    //find all the record whose start & end date is between than starting & ending of the month
  Attendance.find({start: {$gte: startDate},end:{$lte: endDate}},function(err, records) {
          if (err)
              res.send(err);
          var formattedrecords=[];
          for(var i = 0;i<records.length;i++){
            formattedrecords.push(
              {
                "title":records[i].title,
                //"allDay":records[i].allDay,
                "start":records[i].start,
                "end":records[i].end
              }
            )
          }
          res.json(formattedrecords);
      });
});



router.get("/getbydate", (req, res, next) => {
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
    //find all the record whose start & end date is between than starting & ending dates
   
  Attendance.find({start: {$gte: startDate},end:{$lte: endDate}},function(err, records) {
          if (err)
              res.send(err);
          var formattedrecords=[];
          for(var i = 0;i<records.length;i++){
            formattedrecords.push(
              {
                "title":records[i].title,
                "allDay":records[i].allDay,
                "start":records[i].start,
                "end":records[i].end
              }
            )
          }
          res.json(formattedrecords);
      });   
});

module.exports = router;





