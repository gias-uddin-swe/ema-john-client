import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "./../Product/Product";
import spinner from "../../images/loading-spinner.gif";
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { productKey } = useParams();
  document.title = "Product Details";
  useEffect(() => {
    fetch("https://fierce-crag-53070.herokuapp.com/product/" + productKey)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <div>
      {product === {} && (
        <div className="loading-spinner">
          <img src={spinner} alt="" />
        </div>
      )}
      <h1>This is {product.name} Product Details Site................</h1>
      <Product showAddToCart={false} product={product}></Product>
    </div>
  );
};

export default ProductDetails;
