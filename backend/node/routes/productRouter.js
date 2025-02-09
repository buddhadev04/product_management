const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
router.get('/products', productController.getProducts)
router.post('/add/product', productController.addProduct)
router.get('/product/:barcode', productController.getProductByBarcode)
router.patch('/update/:barcode', productController.updateProduct)
router.delete('/delete/:barcode', productController.deleteProduct)
router.post('/add/vendor', productController.addVendor)
router.get('/vendors', productController.getVendors)
router.patch('/update/vendor/:vendorId', productController.updateVendor);
router.delete('/delete/vendor/:vendorId', productController.deleteVendor);



module.exports = router;
