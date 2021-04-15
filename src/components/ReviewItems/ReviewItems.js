import React from "react";
import "./ReviewItems.css";

const ReviewItems = (props) => {
  const { name, price, seller, quantity, key } = props.product;
  return (
    <div className="review-items-main">
      <h3>{name}</h3>
      <p>${price}</p>
      <p>sold by: {seller}</p>
      <p>quantity: {quantity}</p>
      <br />
      <button className="remove-button" onClick={() => props.handelRemoveProduct(key)}>Remove</button>
    </div>
  );
};

export default ReviewItems;
