//define dependency
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const products = require('./api/routes/products');
const orders = require('./api/routes/orders');
const user = require('./api/routes/user');


//content
mongoose.connect(
    'mongodb+srv://admin:admin@rest-api-odqqg.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser : true,
    }
);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('uploads'))
app.use('/products',products);
app.use('/orders',orders);
app.use('/user',user);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status).json({
        message : 'Error 404'
    })
})
//export
module.exports = app;