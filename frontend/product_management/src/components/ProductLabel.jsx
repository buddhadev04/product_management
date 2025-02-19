import React from "react";
import Barcode from "react-barcode";
import "../App.css";

const ProductLabel = ({ product, shopName, shopAddress }) => {
  return (
    <div id="print-section" className="product-label">
      <h2 className="shop-name">{shopName}</h2>
      <p className="shop-address">{shopAddress}</p>
      <hr className="label-divider" />
      <div className="product-details">
        <p>Discount: {product.discount}%</p>
        <p>Size: {product.size}</p>
      </div>
      <p className="product-price">MRP: {product.sellPrice}/-</p>
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
