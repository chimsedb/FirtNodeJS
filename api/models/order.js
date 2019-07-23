const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    _id : Schema.Types.ObjectId,
    product : {
        type : Schema.Types.ObjectId,
        ref : 'Product'
    },
    quanity :{
        type : String,
        default : 1 
    }
})

module.exports = mongoose.model('order',orderSchema);