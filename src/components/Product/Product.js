import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import { Link } from "react-router-dom";
document.title = "ema john";
const Product = (props) => {
  //console.log(props);
  const { name, img, price, seller, stock, key } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <Link to={"/product/" + key}>
          <img src={img} alt="" />
        </Link>
      </div>
      <div className="product-details">
        <h4>
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <br />
        <p>
          <small>by: {seller}</small>
        </p>
        <p>
          <strong>${price}</strong>
        </p>
        <p>only {stock} left in stock-order soon</p>
        {props.showAddToCart && (
          <button
            className="shopping-cart-btn"
            onClick={() => props.cartBtnClick(props.product)}
          >
            {" "}
            <FontAwesomeIcon icon={faShoppingCart} /> add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
