const mongoose = require('mongoose');


const packageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    package:{type: String,required:true}
});

module.exports = mongoose.model('Package', packageSchema);

