const mongoose = require('mongoose');


var minuteFromNow = function(){
    var d = new Date();
     d.setHours(d.getHours() + 5);
   d.setMinutes(d.getMinutes() + 30);
     var n = d.toLocaleString();
   return n;
  };


const subscriptionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
      type: String, 
      required: true, 
      unique: true,
      //email regex (email validation)
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
    package: { type: String, required: true },
    subscribed_time : { type : String, default: minuteFromNow }
    
});

module.exports = mongoose.model('Subscription', subscriptionSchema);

