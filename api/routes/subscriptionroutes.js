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


const Subscription = require("../models/subscription");

router.get("/", (req, res, next) => {
    Subscription.find()
    .select("package ")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        subscription: docs.map(doc => {
          return {
            package: doc.package,
            request: {
              type: "GET",
              url: "http://localhost:3000/subscription/"+ doc._id
              
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
  const subscription = new Subscription({
    _id: new mongoose.Types.ObjectId(),
    package: req.body.package
 
    
  });
  subscription
    .save()
    .then(result => {
      console.log(result),
      Subscription.update({package:req.body.package},{$set : { creation_time : minuteFromNow()}},function(err) {
        if(err) 
        {
           throw err;
        }
       } )
      res.status(201).json({
        message: "added successfully",
        createdSubscription: {
            
            package: result.package,
            request: {
                type: 'GET',
                url: "http://localhost:3000/subscription/" + result._id,
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

router.get("/:subscriptionId", (req, res, next) => {
  const id = req.params.subscriptionId;
  Subscription.findById(id)
    .select('package _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            subscription: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/subscription'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid health tip found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/:subscriptionId", (req, res, next) => {
  const id = req.params.subscriptionId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Subscription.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'user details updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/subscription/'+ id
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

router.delete("/:subscriptionId", (req, res, next) => {
  const id = req.params.subscriptionId;
  Subscription.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'health tip deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/subscription',
              
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


module.exports = router;