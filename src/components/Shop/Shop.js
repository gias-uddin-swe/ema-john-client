import React, { useState, useEffect } from "react";
// import fakeData from "../../fakeData";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { Link } from "react-router-dom";
import "./Shop.css";
import spinner from "../../images/loading-spinner.gif";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../utilities/databaseManager";
document.title = "shop more";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    fetch(`http://localhost:5000/products?search=` + search)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [search]);

  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);

    fetch("https://fierce-crag-53070.herokuapp.com/productByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
    // if (products.length > 0) {
    //   const previewsCart = productKey.map((pdkey) => {
    //     const product = products.find((pd) => pd.key === pdkey);
    //     product.quantity = saveCart[pdkey];
    //     return product;
    //   });
    //   setCart(previewsCart);
    // }
  }, []);

  const buttonClick = (props) => {
    const sameProduct = cart.find((pd) => pd.key === props.key);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== props.key);
      newCart = [...others, sameProduct];
    } else {
      props.quantity = 1;
      newCart = [...cart, props];
    }
    setCart(newCart);

    addToDatabaseCart(props.key, count);
  };
  const handleSearchField = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        <div className="search-div">
          <input
            onChange={handleSearchField}
            type="text"
            className="search-input"
            placeholder="search"
          />
        </div>
        {products.length === 0 && (
          <div className="loading-spinner">
            <img src={spinner} alt="" />
          </div>
        )}
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            cartBtnClick={buttonClick}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="card-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="shopping-cart-btn">Review</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
