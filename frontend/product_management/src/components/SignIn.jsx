import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, updateCredentials } from "../services/AuthService";
import { FaUser, FaLock } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const SignIn = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn(email, password);
    
    if (result.success) {
      navigate("/"); 
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await updateCredentials(updateEmail, oldPassword, newPassword);

    if (result.success) {
      alert("Password updated successfully! Please log in again.");
      setShowModal(false);
      setPassword("");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Admin Sign In</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // FIXED: Added onChange
                placeholder="Enter email"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p className="text-center mt-3">
            <button className="btn btn-link" type="button" onClick={() => setShowModal(true)}>
              Change Password
            </button>
          </p>
        </form>
      </div>

      {/* Modal for Updating Password */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateCredentials}>
          <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={updateEmail}
                onChange={(e) => setUpdateEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Old Password</label>
              <input
                type="password"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignIn;
