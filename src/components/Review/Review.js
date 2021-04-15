import React from "react";
import { useEffect, useState } from "react";
import "./Review.css";
import gify from "../../images/giphy.gif";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import fakeData from "./../../fakeData/index";
import ReviewItems from "./../ReviewItems/ReviewItems";
import Cart from "./../Cart/Cart";
import { useHistory } from "react-router";
const Review = () => {
  const [count, setCount] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const history = useHistory();
  const handleProceedCheckout = () => {
    //setCount([]);
    //setOrderPlaced(true);
    //processOrder();
    history.push(`/shipment`);
  };

  const handelRemoveProduct = (props) => {
    const product = count.filter((pd) => pd.key !== props);
    setCount(product);
    removeFromDatabaseCart(props);
  };
  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    fetch("https://fierce-crag-53070.herokuapp.com/productByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCount(data));
  }, []);

  let thankyou;
  if (orderPlaced) {
    thankyou = <img src={gify} alt="" />;
  }

  return (
    <div className="shop-container">
      <div className="product-container">
        <h1>Orderd Items: {count.length}</h1>
        {count.map((pd) => (
          <ReviewItems
            handelRemoveProduct={handelRemoveProduct}
            product={pd}
            key={pd.key}
          ></ReviewItems>
        ))}
        {thankyou}
      </div>
      <div className="card-container">
        <Cart cart={count}>
          <button onClick={handleProceedCheckout} className="remove-button">
            Proceed checkout
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
