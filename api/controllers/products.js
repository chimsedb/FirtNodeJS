const mongoose = require('mongoose');
const Product = require('../models/products');

exports.products_get_all = (req,res,next)=>{
    Product.find({})
            .then(doc=>{
                console.log(doc);
                res.status(200).json(doc);
            })
            .catch(error=>{
                console.log(error);
            })

}

exports.products_post = (req,res,next)=>{
    const product = new Product({
        _id : new mongoose.Types.ObjectId,
        name : req.body.name,
        price : req.body.price,
        productImage : req.file.path
    })
    product.save()
            .then(result=>{
                console.log(result);
                res.status(200).json({
                    product : product
                })
            })
            .catch(error=>{
                res.status(400).json({
                    error : error
                })
            });
}

exports.products_get_productsID = (req,res,next)=>{
    const id = req.params.productID;
    Product.findById(id)
            .then(doc=>{
                console.log('From database',doc)
            })
            .catch(error=>{
                console.log(error);
                res.status(500).json(error);
                // res.status(400).json(error);
            });    
}

exports.products_delete_id = (req,res,next)=>{
    const id = req.params.productID;
    Product.remove({_id : id})
            .exec()
            .then(result=>{
                res.status(200).json(result);
            })
            .catch()
}

exports.products_path_id = (req,res,next)=>{
    const id = req.params.productID;
    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.name] = ops.value;
    }
    Product.update({_id : id},{$set : updateOps})
            .exec()
            .then(result =>{
                res.status(200).json(result);
            })
            .catch(error =>{
                res.status(500).json(error);
            })
}