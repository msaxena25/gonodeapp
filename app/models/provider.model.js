const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let servicesSchema = new Schema({
    service: {type: String, required: true},
    price:{type: Number, required: true},
    isDeleted: {type:Boolean, default: false},
    createdOn: {type: Date, default: Date.now},
    modifedOn: {type: Date, default: Date.now}
});

let area_Schema = new Schema({
    area: {type: String, required: true},
    createdOn: {type: Date, default: Date.now},
    modifedOn: {type: Date, default: Date.now},
    isDeleted: {type:Boolean, default: false}
});

let feedback_Schema = new Schema({
    review: {type: String},
    rating: {type: Number},
    user:  {type: String, required: true},
    createdOn: {type: Date, default: Date.now},
    modifedOn: {type: Date, default: Date.now},
    isDeleted: {type:Boolean, default: false}
});

let providerSchema = new Schema({
    name:{type:String, required:true},
    mobileNo:{type:String, unique:true},
    isActive: {type: Boolean, default:true},
    password:{type:String},
    city:{type:String},
    state:{type:String},
    country:{type:String},
    services: [servicesSchema],
    areas: [area_Schema],
    completedAssignments: {type: Number},
    earningByApp: {type: Number},
    totalRating: {type: String},
    feedback: [feedback_Schema],
    isDeleted: {type:Boolean, default:false}
})

module.exports = mongoose.model('Provider', providerSchema);