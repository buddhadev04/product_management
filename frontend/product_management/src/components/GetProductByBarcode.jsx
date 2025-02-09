import React, { useState } from "react";
import { fetchProductByBarcode, deleteProduct } from "../services/ProductService";
import BarcodeScanner from "./BarcodeScanner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import SwalAlert from "./SwalAlert";

const GetProductByBarcode = () => {
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBarcodeScan = async (barcode) => {
    try {
      const data = await fetchProductByBarcode(barcode);
      if (data) {
        setProduct(data);
        setShowModal(true);
      } else {
        setProduct(null);
        SwalAlert("warning", "Error", "Product not found.");
        setShowModal(false);
      }
    } catch (error) {
      setProduct(null);
      SwalAlert("error", "Error", "An error occurred while fetching the product.");
      setShowModal(false);
    }
  };

  const handleDelete = async () => {
    if (!product?.barcode) return;

    try {
      const resultMessage = await deleteProduct(product.barcode);
      // setDeleteMessage(resultMessage);
      SwalAlert("success", "Success!", `${resultMessage}`);
      setProduct(null);
      setShowModal(false);
    } catch (error) {
      SwalAlert("error", "Error", "An error occurred while deleting the product.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-primary fw-bold">📷 Scan Product Barcode</h2>
  
      {/* Barcode Scanner */}
      <div className="d-flex justify-content-center">
        <BarcodeScanner onScan={handleBarcodeScan} />
      </div>
  
      {/* Product Details Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header className="bg-primary text-white">
          <Modal.Title className="fw-bold">📦 Product Details</Modal.Title>
          <button className="btn btn-light btn-sm" onClick={closeModal}>
            <AiOutlineClose size={24} />
          </button>
        </Modal.Header>
  
        <Modal.Body>
          {product && (
            <>
              {/* Product Information */}
              <h4 className="fw-bold text-dark text-center mb-3">{product.name}</h4>
              <p className="text-muted text-center"><strong>Barcode:</strong> {product.barcode}</p>
  
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-2"><strong>💰 Sell Price:</strong> ${product.sellPrice}</p>
                  <p className="mb-2"><strong>🔖 Purchase Price:</strong> ${product.purchasePrice}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2"><strong>🎁 Discount:</strong> {product.discount}%</p>
                </div>
              </div>
  
              <hr />
  
              {/* Vendor Details */}
              <h5 className="text-primary fw-bold">🏷️ Vendor Details</h5>
              <div className="row">
                <div className="col-md-6">
                  <p className="text-break"><strong>👤 Name:</strong> {product.vendor?.name}</p>
                  <p className="text-break"><strong>📍 Address:</strong> {product.vendor?.address}</p>
                </div>
                <div className="col-md-6">
                  <p className="text-break"><strong>📞 Phone:</strong> {product.vendor?.phone}</p>
                </div>
              </div>
  
              <hr />
  
              {/* Bank Details */}
              <h5 className="text-primary fw-bold">🏦 Bank Details</h5>
              <div className="row">
                <div className="col-md-6">
                  <p className="text-break"><strong>🏛️ Bank Name:</strong> {product.vendor?.bankName}</p>
                  <p className="text-break"><strong>👤 Account Holder:</strong> {product.vendor?.accHolder}</p>
                </div>
                <div className="col-md-6">
                  <p className="text-break"><strong>IFSC Code:</strong> {product.vendor?.ifscCode}</p>
                  <p className="text-break"><strong>💳 Account Number:</strong> {product.vendor?.accNo}</p>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
  
        {/* Modal Footer */}
        <Modal.Footer>
          <Button variant="secondary" className="shadow-sm" onClick={closeModal}>
            <AiOutlineClose size={20} className="me-2" /> Close
          </Button>
          <Button variant="danger" className="shadow-sm" onClick={handleDelete}>
            <AiFillDelete size={20} className="me-2" /> Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GetProductByBarcode;
