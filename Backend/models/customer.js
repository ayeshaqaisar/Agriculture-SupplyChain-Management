const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CustomerSchema = new Schema({

    name:{
        type:String,
    },
    email:{
        type:String,
    },
    contactNumber:{
        type:String,
    },
    address:{
        type:String,
    },
    password:{
        type:String,
    },
})

const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;
