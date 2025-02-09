import React from "react";
import Barcode from "react-barcode";
import "../App.css";

const ProductLabel = ({ product, shopName, shopAddress }) => {
  return (
    <div
      id="print-section"
      style={{
        padding: "10px",
        border: "1px solid #000",
        textAlign: "center",
        width: "300px",
        background: "#fff",
        marginTop: "5px",
        pageBreakAfter: "always", // Ensures each label is printed on a new page
      }}
    >
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          margin: "0",
          fontFamily: "'Roboto Slab', serif",
        }}
      >
        {shopName}
      </h2>

      <p style={{ fontSize: "12px", margin: "0", fontFamily: "'Roboto Slab', serif" }}>{shopAddress}</p>
      <hr style={{ margin: "5px 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", margin: "5px 0" }}>
        <p>Discount: {product.discount}%</p>
        <p>Size: {product.size}</p>
      </div>
      <p style={{ fontSize: "20px", fontWeight: "bold", margin: "5px 0" }}>MRP: {product.sellPrice}/-</p>
      <div className="barcode">
        {product.barcode ? (
          <Barcode value={product.barcode} format="CODE128" width={2} height={40} displayValue />
        ) : (
          <p>No Barcode</p>
        )}
      </div>
    </div>
  );
};

export default ProductLabel;