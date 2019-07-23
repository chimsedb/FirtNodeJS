const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = Schema({
    _id : Schema.Types.ObjectId,
    name : String,
    price : String,
    productImage : {
        type : String,
        require : true
    }
});

module.exports = mongoose.model('Product',ProductsSchema);