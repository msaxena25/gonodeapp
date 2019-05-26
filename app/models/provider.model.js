const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let servicesSchema = new Schema({
    service: {type: String, required: true},
    price:{type: Number, required: true}
})
//
let providerSchema = new Schema({
    name:{type:String},
    mobileNo:{type:String},
    password:{type:String},
    city:{type:String},
    state:{type:String},
    country:{type:String},
    services: [servicesSchema],
    area: {type: Array},
    completedAssignments: {type: Number},
    ratings: {type: Number},
    reviews:{type: Array}
})

module.exports = mongoose.model('Provider', providerSchema);