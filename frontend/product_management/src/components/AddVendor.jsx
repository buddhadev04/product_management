import React, {useState} from "react";
import { addVendor } from "../services/ProductService";
import SwalAlert from "./SwalAlert";

const AddVendor = () => {
    const [newVendor, setNewVendor] = useState({
      name: "",
      address: "",
      phone: "",
      bankName: "",
      accHolder: "",
      ifscCode: "",
      accNo: "",
    });
  
    const handleChange = (e) => {
      setNewVendor({ ...newVendor, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validate required fields
      if (!newVendor.name || !newVendor.address) {
        SwalAlert("warning", "Missing Fields", "Please fill in all required fields.");
        return;
      }
  
      try {
        const msg = await addVendor(newVendor); // API call to add vendor
        SwalAlert("success", "Success!", `${msg}`);
  
        // Reset form after submission
        setNewVendor({
          name: "",
          address: "",
          phone: "",
          bankName: "",
          accHolder: "",
          ifscCode: "",
          accNo: "",
        });
      } catch (error) {
        console.error("Error adding vendor:", error);
        SwalAlert("error", "Error", "Failed to add product.");
      }
    };
  
    return (
      <div className="container mt-4">
        <div className="card shadow-lg p-5 rounded-3 bg-light">
          <h2 className="text-center text-primary fw-bold mb-4">Add Vendor</h2>
    
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Vendor Details */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Vendor Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newVendor.name}
                    onChange={handleChange}
                    placeholder="Enter vendor name"
                    required
                  />
                </div>
    
                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Vendor Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={newVendor.address}
                    onChange={handleChange}
                    placeholder="Enter vendor address"
                    required
                  />
                </div>
    
                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Vendor Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={newVendor.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
    
              {/* Bank Details */}
              <div className="col-md-6">
                <h4 className="text-secondary fw-bold">Bank Details</h4>
                <hr />
    
                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Bank Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bankName"
                    value={newVendor.bankName}
                    onChange={handleChange}
                    placeholder="Enter bank name"
                  />
                </div>
    
                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">IFSC Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ifscCode"
                    value={newVendor.ifscCode}
                    onChange={handleChange}
                    placeholder="Enter IFSC code"
                  />
                </div>
    
                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Account Holder Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="accHolder"
                    value={newVendor.accHolder}
                    onChange={handleChange}
                    placeholder="Enter account holder name"
                  />
                </div>
    
                <div className="mb-3">
                  <label className="form-label fs-5 fw-bold">Account Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="accNo"
                    value={newVendor.accNo}
                    onChange={handleChange}
                    placeholder="Enter account number"
                  />
                </div>
              </div>
            </div>
    
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success fw-bold w-50">
                Add Vendor
              </button>
            </div>
          </form>
        </div>
      </div>
    );
    
  };
  
  export default AddVendor;