import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const product = props.cart;
  const total = product.reduce(
    (total, pd) => total + pd.price * pd.quantity || 1,
    0
  );

  let shippingCost = 0;
  if (total > 100) {
    shippingCost = 1;
  } else if (total > 40) {
    shippingCost = 5;
  } else if (total > 0) {
    shippingCost = 10;
  }

  const withoutShipping = total - shippingCost;

  const tax = total / 5;
  const grandTotal = total + shippingCost + tax;
  const formatNumber = (num) => {
    const convert = num.toFixed(2);
    return Number(convert);
  };

  return (
    <div className="cart-main-div">
      <h2>Order Summary</h2>
      <h4>Items ordered: {product.length}</h4>
      <p>Products Price: {formatNumber(total)}</p>
      <p>Shipping Cost: {shippingCost}</p>
      <p>Without Shipping: {formatNumber(withoutShipping)}</p>
      <p>Tax + vat: {formatNumber(tax)}</p>
      <p>
        <strong>Total: {formatNumber(grandTotal)}</strong>
      </p>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
