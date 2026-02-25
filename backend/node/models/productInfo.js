const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    barcode: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    sellPrice: {
        type: Number
    },
    purchasePrice: {
        type: Number
    },
    discount: {
        type: Number
    },
    size: {
        type: String
    },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
})

productSchema.index({ barcode: 1 }, { unique: true });
const productInfo = mongoose.model('productsDetails', productSchema);
module.exports = productInfo;