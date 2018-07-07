const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


var minuteFromNow = function(){
    var d = new Date();
     d.setHours(d.getHours() + 5);
   d.setMinutes(d.getMinutes() + 30);
     var n = d.toLocaleString();
   return n;
  };


const Booking = require("../models/booking");





router.get("/", (req, res, next) => {
    Booking.find()
    .select("date slot booking_time ")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        booking: docs.map(doc => {
          return {
            date: doc.date,
            slot: doc.slot,
            booking_time: doc.booking_time,
            request: {
              type: "GET",
              url: "http://localhost:3000/booking/"+ doc._id
              
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});






router.post("/", (req, res, next) => {
  const booking = new Booking({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    date: req.body.date,
    slot: req.body.slot,
    booking_time: req.body.booking_time
    
  });
  booking
    .save()
    .then(result => {
      console.log(result),
      Booking.update({package:req.body.package},{$set : { booking_time : minuteFromNow()}},function(err) {
        if(err) 
        {
           throw err;
        }
       } )
      res.status(201).json({
        message: "booked successfully",
        BOOKINGDETAILS: {
          date: result.date,
            slot: result.slot,
            request: {
                type: 'GET',
                url: "http://localhost:3000/booking/" + result._id,
            }
            
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});




router.get("/:bookingId", (req, res, next) => {
    const id = req.params.bookingId;
    Booking.findById(id)
      .select('date slot booking_time')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              booking: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:3000/booking'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No booking found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

module.exports = router;