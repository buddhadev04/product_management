const Product = require('../models/productInfo');
const Vendor = require('../models/vendor');
const mongoose = require('mongoose');
class ProdcutController {

    async addVendor(req, res){
        try{
            console.log(req.body);
            if (req.body){
                const vendor = await Vendor.create(req.body);
                res.status(201).json({message: "vendor created successfully", vendor});
            }
        }
        catch (err) {
            return res.status(500).json({error: "Error Creating  Vendor", details: err.message})
        }
    }
    async getVendors(req, res){
        try {
            const vendors = await Vendor.find({});
            console.log("vendors", JSON.stringify(vendors));
            res.status(200).json({vendors})
        }
        catch (err) {
            res.status(500).json({error: "Error Fetching Vendors", details: err.message})
        }
    }

    async updateVendor(req, res) {
        try {
            const vendorId = req.params.vendorId;
            const updatedData = req.body;
    
            const updatedVendor = await Vendor.findByIdAndUpdate(
                vendorId, 
                updatedData, 
                { new: true }
            );
    
            if (!updatedVendor) {
                return res.status(404).json({ message: "Vendor not found" });
            }
    
            return res.status(200).json({ message: "Vendor updated successfully", updatedVendor });
        } catch (err) {
            return res.status(500).json({ error: "Error updating vendor", details: err.message });
        }
    }

    async deleteVendor(req, res) {
        try {
            const { vendorId } = req.params;
    
            const deletedVendor = await Vendor.findByIdAndDelete(vendorId);
    
            if (!deletedVendor) {
                return res.status(404).json({ message: "Vendor not found" });
            }
    
            return res.status(200).json({ message: "Vendor deleted successfully" });
        } catch (err) {
            return res.status(500).json({ error: "Error deleting vendor", details: err.message });
        }
    }
    
    

    async getProducts(req, res){
        try {
            const products = await Product.find({});
            console.log(JSON.stringify(products));
            res.status(200).json({products})
        }
        catch (err) {
            res.status(500).json({error: "Error Fetching Products", details: err.message})
        }
    }

    async addProduct(req, res) {
        try {
            console.log(req.body);
    
            // Validate input
            if (!req.body.name || !req.body.vendor) {
                return res.status(400).json({ error: "Missing required fields (name, vendor)" });
            }
    
            // Fetch full vendor details from DB
            const vendorData = await Vendor.findById(req.body.vendor);
            console.log("vendorData", vendorData);
            if (!vendorData) {
                return res.status(404).json({ error: "Vendor not found" });
            }
    
            // Prepare product data with full vendor details
            const productData = {
                barcode: req.body.barcode,
                name: req.body.name,
                sellPrice: Number(req.body.sellPrice) || 0,
                purchasePrice: Number(req.body.purchasePrice) || 0,
                discount: Number(req.body.discount) || 0,
                vendor: vendorData._id
            };
    
            console.log("Saving Product Data:", productData);
            const product = await Product.create(productData);
            
            res.status(201).json({ message: "Product created successfully", product });
        }
        catch (err) {
            console.error("Error creating product:", err);
            res.status(400).json({ error: "Error Creating Product", details: err.message });
        }
    }
    

    async getProductByBarcode(req, res) {
        try {
            console.log("Barcode:", req.params.barcode);
            const product = await Product.findOne({ barcode: req.params.barcode }).populate('vendor');;
            if (product) {
                return res.status(200).json(product);
            }
            else {
                return res.status(404).json({message: "Product not Found"});
            }
        }
        catch (err) {
            return res.status(500).json({error: "Error Retriving Product", details: err.message})
        }
        
    }

    async updateProduct(req, res) {
        try {
            const barcode = req.params.barcode; 
            const updatedData = req.body; 
    
            const updatedProduct = await Product.findOneAndUpdate(
                { barcode: barcode }, 
                updatedData,           
                { new: true }        
            );
    
            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            return res.status(200).json({ message: "Product updated successfully", updatedProduct });
        } catch (err) {
            return res.status(500).json({ error: "Error updating product", details: err.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            console.log("Barcode for delete:", req.params.barcode);
            const product = await Product.findOneAndDelete({ barcode: req.params.barcode }); // Corrected method name
            if (product) {
                res.status(200).json({ message: "Product deleted successfully", product });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error deleting product", details: error.message });
        }
    }
    
    
}

module.exports = new ProdcutController();