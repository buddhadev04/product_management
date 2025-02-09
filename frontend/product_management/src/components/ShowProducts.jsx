import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/ProductService";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data || []);
    };
    fetchData();
  }, []);

  // Handle click on a product to show details
  const handleProductClick = (product) => {
    setSelectedProduct(product);  // Set the selected product
  };

  // Close modal
  const closeModal = () => {
    setSelectedProduct(null);  // Reset selected product to close the modal
  };

  return (
    <div>
      <div className="card mt-4">
        <div className="card-body">
          <h2 className="card-title">Product List</h2>
          {products.length > 0 ? (
            <ul className="list-group">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="list-group-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleProductClick(product)} // Open details on click
                >
                  {product.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="alert alert-warning">No products available.</p>
          )}
        </div>
      </div>

      {/* Modal for displaying product details */}
      {selectedProduct && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="productModalLabel">
                  {selectedProduct.name} Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Price:</strong> {selectedProduct.price}</p>
                <p><strong>Barcode:</strong> {selectedProduct.barcode}</p>
                <p><strong>Vendor Name:</strong> {selectedProduct.vendor.name}</p>
                <p><strong>Vendor Address:</strong> {selectedProduct.vendor.address}</p>
                <p><strong>Vendor Phone:</strong> {selectedProduct.vendor.phone}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProducts;
