const express = require('express');
// const mongoose = require('mongoose');
const ProductsControllers = require('../controllers/products');

const multer = require('multer');
const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,'./uploads/');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage : storage})

const router = express.Router();

router.get('/',ProductsControllers.products_get_all);

router.post('/',upload.single('productImage'),ProductsControllers.products_post);

router.get('/:productID',ProductsControllers.products_get_productsID);

router.delete('/:productID',ProductsControllers.products_delete_id);

router.patch('/:productID',ProductsControllers.products_path_id);

module.exports = router;

