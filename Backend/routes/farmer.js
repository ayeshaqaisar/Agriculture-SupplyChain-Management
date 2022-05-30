const express = require('express')
const router = express.Router()
const farmer = require('../models/farmer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


router.post('/', (req, res, next) => {
  console.log(req.body)
  farmer.findOne({email: req.body.email})
    .then(doc => {
      if(doc){
        if(bcrypt.compareSync(req.body.password, doc.password)){
          const token = jwt.sign({
            name: doc.name,
            email: doc.email,
            contactNumber: doc.contactNumber,
            address: doc.address
          }, 'SECRET_KEY')
          res.cookie('token', token, {
            maxAge: 3600*1000
          })
          // res.render('/farmerProfile');
          res.status(200).send()
        }else{
          res.status(400).json({err: "Wrong Credentials"})
        }
      }else{
        res.status(400).json({err: "Wrong Credentials"})
      }
    }).catch(err => {
      console.log(err)
      res.status(500).json({err})
    })
})

module.exports = router