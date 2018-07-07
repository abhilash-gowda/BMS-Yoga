const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
//const timestamp = require('time-stamp');



const trainerRoutes = require("./api/routes/trainerroutes");

const userRoutes = require("./api/routes/userroutes");

const packageRoutes = require("./api/routes/packageroutes");

const bookingRoutes = require("./api/routes/bookingroutes");

const tipRoutes = require("./api/routes/tiproutes");





const feedbackRoutes = require("./api/routes/feedback");

const attendanceRoutes = require("./api/routes/attendanceroutes");


/*mongoose.connect('mongodb://node-shop:'+process.env.MONGO_ATLAS_PW+'@node-rest-shop-shard-00-00-ehc7x.mongodb.net:27017,node-rest-shop-shard-00-01-ehc7x.mongodb.net:27017,node-rest-shop-shard-00-02-ehc7x.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true',
{
  useMongoClient: true
});*/
//mongoose.connect('mongodb+srv://node-shop:node-shop@node-rest-shop-ehc7x.mongodb.net/test?retryWrites=true');
//mongoose.connect('mongodb+srv://node-shop:node-shop@node-rest-shop-ehc7x.mongodb.net/test?');
//mongoose.connect('mongodb+srv://node-shop:node-shop@node-rest-shop-ehc7x.mongodb.net/test?retryWrites=true');
//-> ab  mongoose.connect('mongodb://node-shop:node-shop96@ds117701.mlab.com:17701/node-shop');

mongoose.connect('mongodb://nodeshop:nodeshop95@ds221271.mlab.com:21271/node-shop');
//mongodb+srv://<USERNAME>:<PASSWORD>@node-rest-shop-ehc7x.mongodb.net/test?retryWrites=true

//mongodb://node-shop:+process.env.MONGO_ATLAS_PW+'@node-rest-shop-shard-00-00-ehc7x.mongodb.net:27017,node-rest-shop-shard-00-01-ehc7x.mongodb.net:27017,node-rest-shop-shard-00-02-ehc7x.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});


app.use("/trainer", trainerRoutes);

app.use("/user", userRoutes);

app.use("/booking", bookingRoutes);

app.use("/package", packageRoutes);

app.use("/tip", tipRoutes);




app.use("/feedback", feedbackRoutes);




app.use("/attendance", attendanceRoutes);



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});




app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});






module.exports = app;