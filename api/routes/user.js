const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            res.status(500).json({
                error : err 
            })
        }else{
            const user = new User({
                _id : new mongoose.Types.ObjectId,
                email : req.body.email,
                password : hash
            });

            user.save()
                .then(result =>{
                    res.status(201).json({
                        result : result
                    });
                })
                .catch(error=>{
                    res.status(500).json({
                        error : error 
                    });
                })
        }
    })

})

router.get('/',(req,res,next)=>{
   
   User.find({})
        .exec()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err =>{
            res.status(500).json(err);
        })
})


module.exports = router;