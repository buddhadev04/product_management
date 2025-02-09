const mongoose = require('mongoose');
const vendorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    bankName: {
        type: String
    },
    accHolder: {
        type: String
    },
    ifscCode: {
        type: String
    },
    accNo: {
        type: Number, 
    }

})

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;