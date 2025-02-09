import React, { useState } from "react";

const BarcodeScanner = ({
  onScan,
  placeholder = "Scan barcode",
  label = "Barcode:",
  buttonText = "Enter Barcode Manually",
}) => {
  const [barcode, setBarcode] = useState("");
  const [isManualInput, setIsManualInput] = useState(false);

  const handleInputChange = (e) => {
    setBarcode(e.target.value);
  };

  const handleManualSubmit = () => {
    if (barcode.trim()) {
      onScan(barcode.trim()); // Pass the barcode to the parent
      setBarcode(""); // Reset input
      setIsManualInput(false); // Close manual input mode
    }
  };

  const toggleManualInput = () => {
    setIsManualInput((prev) => !prev);
    setBarcode(""); // Reset input
  };

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      {!isManualInput ? (
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={barcode}
            onChange={handleInputChange}
            placeholder={placeholder}
            onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleManualInput}
          >
            {buttonText}
          </button>
        </div>
      ) : (
        <div className="mt-3">
          <input
            type="text"
            className="form-control"
            value={barcode}
            onChange={handleInputChange}
            placeholder="Enter barcode manually"
          />
          <div className="d-flex justify-content-end mt-2">
            <button
              className="btn btn-secondary me-2"
              onClick={toggleManualInput}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleManualSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
