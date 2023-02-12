const express = require('express');
const router = express.Router();
const { getDetails, addAddressee, addOrUpdateDetails, getAddressee} = require('./dbService');


router.get('/getDetails',   function (req,res,next){
    
    try {
        getDetails().then(({recordset}) => {
            res.send(recordset) ;
         }).catch(err => {
             console.log( err);
         }) 
       
    }
    catch (err){
        res.send([]);
    }
})

router.get('/getAddressee',   function (req,res,next){
    
    try {
        getAddressee().then(({recordset}) => {
            res.send(recordset) ;
         }).catch(err => {
             console.log( err);
         }) 
       
    }
    catch (err){
        res.send([]);
    }
})

router.post('/addAddressee',   function (req,res,next){
    const  {name, address}  = req.body;
    try {
        addAddressee(name, address).then(({recordset}) => {
            res.send(true) ;
         }).catch(err => {
             console.log( err);
         })
      
    }
    catch (err){
        res.send(false);
    }
})

router.post('/addOrUpdateDetails',   function (req,res,next){
    const  {senderId, firstName, lastName, address, email, title, 
        text, width, height, background, border, fontColor, font}  = req.body;
    try {
        addOrUpdateDetails(senderId, firstName, lastName, address, email, title, 
            text, width, height, background, border, fontColor, font)
        .then(() => {
            res.send(true) ;
         }).catch(err => {
             console.log( err);
         })
      
    }
    catch (err){
        res.send(false);
    }
})
 

module.exports= router
 

 