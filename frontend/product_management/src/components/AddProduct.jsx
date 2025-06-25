import React, { useState, useEffect, useRef } from "react";
import { addProduct, fetchProductByBarcode, fetchVendors } from "../services/ProductService";
import ProductLabel from "./ProductLabel";
import SwalAlert from "./SwalAlert";
import { useReactToPrint } from "react-to-print";
import "../App.css";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    sellPrice: "",
    purchasePrice: "",
    size: "",
    discount: "",
    vendor: "",
  });

  const [productCount, setProductCount] = useState(1); // Counter for multiple products
  const [submittedProducts, setSubmittedProducts] = useState([]); // Store multiple products
  const [vendors, setVendors] = useState([]);

  const shopName = "UJJWAL DRESSES";
  const shopAddress = "DUBRAJPUR, BASAKPARA, BIRBHUM";

  const generateBarcode = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const checkAndGenerateBarcode = async () => {
    let barcode = generateBarcode();
    let product = await fetchProductByBarcode(barcode);

    while (product) {
      barcode = generateBarcode();
      product = await fetchProductByBarcode(barcode);
    }

    return barcode;
  };

  useEffect(() => {
    const getVendors = async () => {
      const data = await fetchVendors();
      setVendors(Array.isArray(data.vendors) ? data.vendors : []);
    };
    getVendors();
  }, []);

  const handleVendorChange = (e) => {
    setNewProduct({ ...newProduct, vendor: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.vendor) {
      SwalAlert("warning", "Missing Fields", "Please fill in all required fields.");
      return;
    }

    try {
      const createdProducts = [];

      for (let i = 0; i < productCount; i++) {
        const barcode = await checkAndGenerateBarcode();
        const productData = { ...newProduct, barcode };

        console.log("Submitting Product:", productData);
        await addProduct(productData);
        createdProducts.push(productData);
      }

      SwalAlert("success", "Success!", `${productCount} products added successfully.`);
      setSubmittedProducts(createdProducts);

      setNewProduct({
        name: "",
        sellPrice: "",
        purchasePrice: "",
        size: "",
        discount: "",
        vendor: "",
      });

      setProductCount(1); // Reset counter after submission
    } catch (error) {
      console.error("Error adding product:", error);
      SwalAlert("error", "Error", "Failed to add product.");
    }
  };

  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
      contentRef,
      documentTitle: "Product Label",
      removeAfterPrint: true,
    });

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 rounded-3 bg-light">
        <div className="card-body">
          <h2 className="text-center text-primary fw-bold mb-4">Add Product</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Product Details - Left Column */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Purchase Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newProduct.purchasePrice}
                    onChange={(e) => setNewProduct({ ...newProduct, purchasePrice: Number(e.target.value) })}
                    placeholder="Enter purchase price"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Sell Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newProduct.sellPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, sellPrice: Number(e.target.value) })}
                    placeholder="Enter sell price"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Size</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newProduct.size}
                    onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                    placeholder="Enter product size"
                  />
                </div>
              </div>

              {/* Vendor & Quantity Details - Right Column */}
              <div className="col-md-6">
                <h4 className="text-secondary fw-bold">Vendor Details</h4>
                <hr />

                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Select Vendor</label>
                  <select className="form-select" onChange={handleVendorChange} value={newProduct.vendor}>
                    <option value="">Select a Vendor</option>
                    {vendors.map((vendor) => (
                      <option key={vendor._id} value={vendor._id}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Discount (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newProduct.discount}
                    onChange={(e) => setNewProduct({ ...newProduct, discount: Number(e.target.value) })}
                    placeholder="Enter discount"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Number of Products</label>
                  <input
                    type="number"
                    className="form-control"
                    value={productCount}
                    onChange={(e) => setProductCount(Number(e.target.value))}
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success fw-bold w-50">
                Add Product
              </button>
            </div>
          </form>

          {/* Submitted Products Section */}
          {submittedProducts.length > 0 && (
            <div className="mt-4">
              <h4 className="text-secondary fw-bold">Click to Print</h4>
              <hr />
              <div ref={contentRef} className="print-section">
                {submittedProducts.map((product, index) => (
                  <div key={index} className="print-page-break">
                    <div className="card shadow-sm p-3 mb-3">
                      <ProductLabel product={product} shopName={shopName} shopAddress={shopAddress} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button onClick={handlePrint} className="btn btn-primary fw-bold w-50">
                  Print All Labels
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;