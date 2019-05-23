const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let providerSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 120
    },
    mobileNo: {
        type: String,
        required: true,
        max: 10
    }
})

module.exports =  mongoose.model('Provider', providerSchema);