import React, { useState } from "react";
import { fetchProductByBarcode, updateProduct } from "../services/ProductService";
import BarcodeScanner from "./BarcodeScanner";
import ProductLabel from "./ProductLabel";
import SwalAlert from "./SwalAlert";

const UpdateProduct = () => {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [submittedProduct, setSubmittedProduct] = useState(null);

  const shopName = "UJJWAL DRESSES";
  const shopAddress = "DUBRAJPUR, BASAKPARA, BIRBHUM";

  const handleBarcodeScan = async (scannedBarcode) => {
    setBarcode(scannedBarcode);
    await fetchProductDetails(scannedBarcode);
  };

  const fetchProductDetails = async (barcode) => {
    try {
      const data = await fetchProductByBarcode(barcode);
      if (data) {
        setProduct(data);
        setUpdatedProduct(data);
      } else {
        console.log("Product not found.");
        setProduct(null);
        setUpdatedProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product details.", error);
      setProduct(null);
      setUpdatedProduct(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseMessage = await updateProduct(barcode, updatedProduct);
      SwalAlert("success", "Success!", `${responseMessage}`);
      setSubmittedProduct(updatedProduct);
    } catch (error) {
      SwalAlert("error", "Error!", "Failed to Update Vendor!");
    }
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow">
      <h2 className="mb-4 text-center text-primary">Update Product</h2>

      <div className="mb-4 text-center">
        <BarcodeScanner onScan={handleBarcodeScan} />
      </div>

      {product && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={updatedProduct?.name || ""}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Sell Price</label>
              <input
                type="number"
                className="form-control"
                value={updatedProduct?.sellPrice || ""}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, sellPrice: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Purchase Price</label>
              <input
                type="number"
                className="form-control"
                value={updatedProduct?.purchasePrice || ""}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, purchasePrice: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Size</label>
              <input
                type="text"
                className="form-control"
                value={updatedProduct?.size || ""}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, size: e.target.value })
                }
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Discount</label>
              <input
                type="number"
                className="form-control"
                value={updatedProduct?.discount || ""}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, discount: e.target.value })
                }
              />
            </div>
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="btn btn-success w-50 fw-bold">
              Update Product
            </button>
          </div>
        </form>
      )}

      {submittedProduct && (
        <div className="mt-4 p-3 bg-white shadow-sm rounded text-center">
          <h5 className="text-success">Updated Product Label</h5>
          <ProductLabel
            product={submittedProduct}
            shopName={shopName}
            shopAddress={shopAddress}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
