import React from "react";

const Inventory = () => {
  const handleAddProduct = () => {
    const product = {};
    fetch("https://fierce-crag-53070.herokuapp.com/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <h1>This si Inventory </h1>
      <form action="">
        <label htmlFor="">product name: </label>
        <input type="text" />
        <br />
        <label htmlFor="">product price: </label>
        <input type="text" />
        <br />
        <label htmlFor="">product quantity: </label>
        <input type="text" />
        <br />
        <label htmlFor="">product image: </label>
        <input type="text" type="file" />
        <br />
        <button onClick={handleAddProduct} className="btn btn-info">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Inventory;
