const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    mobileNo: String,
    password: String,
    address: String,
    city: String,
    state: String,
    Country: String,
    isActive: {type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
    createdOn: {type: Date, default: Date.now}

})

module.exports = mongoose.model('User', userSchema);