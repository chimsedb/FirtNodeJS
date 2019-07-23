const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = Schema({
    _id : Schema.Types.ObjectId,
    email : {type : String ,required : true, unique : true},
    password : String
});

module.exports = mongoose.model('User',User);