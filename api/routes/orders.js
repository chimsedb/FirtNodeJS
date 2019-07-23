const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Order = require('../models/order');

router.get('/',(req,res,next)=>{

    Order.find({})
        .exec()
        .then(result=>{
            res.status(200).json({
                count : result.length,
                orders : result.map(docs =>{
                    return {
                        _id : docs.id,
                        product : docs.product,
                        quanity : docs.quanity,
                        request : {
                            type : 'GET',
                            URL : 'http://localhost:3000/orders/' + docs.product
                        }
                    }
                })
            })
        })
        .catch(error=>{
            res.status(500).json(error)
        })
})

router.post('/',(req,res,next)=>{
    const order = new Order({
        _id : mongoose.Types.ObjectId(),
        product : req.body.product,
        quanity : req.body.quanity
    })

    order.save()
        // .exec()
        .then(reuslt =>{
            res.status(200).json(reuslt)
        })
        .catch(error=>{
            res.status(500).json(error)
        })

})

router.get('/:OrderID',(req,res,next)=>{
    const ProductID = req.params.OrderID;

    Order.find({
        product : ProductID
    })
        .exec()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(error=>{
            res.status(500).json(error);
        })

})

module.exports = router;