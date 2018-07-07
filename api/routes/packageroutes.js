const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Package = require("../models/package");

router.get("/", (req, res, next) => {
    Package.find()
    .select("package ")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        package: docs.map(doc => {
          return {
            package: doc.package,
            request: {
              type: "GET",
              url: "http://localhost:3000/package/"+ doc._id
              
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
  const package = new Package({
    _id: new mongoose.Types.ObjectId(),
    package: req.body.package
    
  });
  package
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "package added successfully",
        PACKAGE_DETAILS: {
          package: result.package,
            request: {
                type: 'GET',
                url: "http://localhost:3000/package/" + result._id,
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




router.get("/:packageId", (req, res, next) => {
    const id = req.params.packageId;
    Package.findById(id)
      .select('package')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              package: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:3000/package'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No package found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

  router.put("/:packageId", (req, res, next) => {
    const id = req.params.packageId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Package.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'package details updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/package/'+ id
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
  
  router.delete("/:packageId", (req, res, next) => {
    const id = req.params.packageId;
    Package.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'package deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/package',
                
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