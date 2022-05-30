const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const FarmerSchema = new Schema({

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
    products:{
        type:Array,
    }
})
// FarmerSchema.plugin(passportLocalMongoose,{ usernameField : 'email' });

const Farmer = mongoose.model('farmer', FarmerSchema);

module.exports = Farmer;
