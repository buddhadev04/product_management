import React, { useEffect, useState } from "react";
import { fetchVendors, deleteVendor, updateVendor } from "../services/ProductService";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiFillDelete, AiFillEdit, AiOutlineClose } from "react-icons/ai";
import SwalAlert from "./SwalAlert";

const ShowVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [vendorForm, setVendorForm] = useState({
    name: "",
    address: "",
    phone: "",
    bankName: "",
    accHolder: "",
    ifscCode: "",
    accNo: "",
  });

  // Fetch vendors when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVendors();
        console.log(data.vendors);
        if (data && Array.isArray(data.vendors)) {
          setVendors(data.vendors);
        } else {
          setVendors([]);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setVendors([]);
      }
    };
    fetchData();
  }, []);

  // Handle vendor selection
  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
    setVendorForm({ ...vendor }); // Prefill form
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
  };

  // Handle delete vendor
  const handleDelete = async () => {
    if (selectedVendor) {
      try {
        await deleteVendor(selectedVendor._id);
        setVendors(vendors.filter((v) => v._id !== selectedVendor._id));
        SwalAlert("success", "Success!", "Vendor Deleted Successfully!");
        closeModal();
      } catch (error) {
        SwalAlert("error", "Error!", "Failed to Delete Vendor!");
      }
    }
  };

  // Handle input change for editing vendor
  const handleChange = (e) => {
    setVendorForm({ ...vendorForm, [e.target.name]: e.target.value });
  };

  // Handle vendor update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateVendor(vendorForm._id, vendorForm);
      setVendors(vendors.map((v) => (v._id === vendorForm._id ? vendorForm : v)));
      setEditMode(false);
      closeModal();
      SwalAlert("success", "Success!", "Vendor Updated Successfully!");
    } catch (error) {
      console.error("Error updating vendor:", error);
      SwalAlert("error", "Error!", "Failed to Update Vendor!");
    }
  };

  return (
    <div className="container mt-4">
      {/* Vendor List Card */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white fw-bold text-center">
          🏷️ Vendor List
        </div>
        <div className="card-body">
          {vendors.length > 0 ? (
            <ul className="list-group">
              {vendors.map((vendor) => (
                <li
                  key={vendor._id}
                  className="list-group-item d-flex justify-content-between align-items-center p-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleVendorClick(vendor)}
                >
                  <span className="fw-bold">{vendor.name}</span>
                  <AiFillEdit
                    size={22}
                    className="text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVendorClick(vendor);
                      setEditMode(true);
                    }}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="alert alert-warning text-center">No vendors available.</p>
          )}
        </div>
      </div>
  
      {/* Vendor Details/Edit Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header className="bg-primary text-white">
          <Modal.Title className="fw-bold">
            {editMode ? "✏️ Edit Vendor" : "📋 Vendor Details"}
          </Modal.Title>
          <button className="btn btn-light btn-sm" onClick={closeModal}>
            <AiOutlineClose size={24} />
          </button>
        </Modal.Header>
  
        <Modal.Body>
          {editMode ? (
            // Edit Form
            <Form onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={vendorForm.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={vendorForm.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={vendorForm.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
  
              <h6 className="text-primary fw-bold">🏦 Bank Details</h6>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="bankName"
                      value={vendorForm.bankName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>IFSC Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="ifscCode"
                      value={vendorForm.ifscCode}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Account Holder</Form.Label>
                    <Form.Control
                      type="text"
                      name="accHolder"
                      value={vendorForm.accHolder}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="accNo"
                      value={vendorForm.accNo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
  
              <Button variant="primary" type="submit" className="mt-3 w-100">
                Update Vendor
              </Button>
            </Form>
          ) : (
            // Vendor Details View
            selectedVendor && (
              <>
                <h4 className="fw-bold text-center text-dark">{selectedVendor.name}</h4>
                <p className="text-center text-muted"><strong>📍 Address:</strong> {selectedVendor.address}</p>
                <p className="text-center"><strong>📞 Phone:</strong> {selectedVendor.phone}</p>
  
                <hr />
  
                <h5 className="text-primary fw-bold">🏦 Bank Details</h5>
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>🏛️ Bank Name:</strong> {selectedVendor.bankName}</p>
                    <p><strong>IFSC Code:</strong> {selectedVendor.ifscCode}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>👤 Account Holder:</strong> {selectedVendor.accHolder}</p>
                    <p><strong>💳 Account Number:</strong> {selectedVendor.accNo}</p>
                  </div>
                </div>
              </>
            )
          )}
        </Modal.Body>
  
        {/* Modal Footer */}
        <Modal.Footer>
          {!editMode ? (
            <>
              <Button variant="danger" className="shadow-sm" onClick={handleDelete}>
                <AiFillDelete size={20} className="me-2" /> Delete
              </Button>
              <Button variant="secondary" className="shadow-sm" onClick={() => setEditMode(true)}>
                <AiFillEdit size={20} className="me-2" /> Edit
              </Button>
            </>
          ) : (
            <Button variant="secondary" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowVendors;
