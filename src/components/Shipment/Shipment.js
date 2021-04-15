import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart } from "../../utilities/databaseManager";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import "./Shipment.css";

const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    setShippingData(data);
  };
  const handlePaymentSuccess = (paymentId) => {
    const saveCart = getDatabaseCart();

    const productDetails = {
      ...loggedInUser,
      products: saveCart,
      shipment: shippingData,
      paymentId,
      Data: new Date(),
    };
    fetch("https://fierce-crag-53070.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Congratulation your order placed Successfully!!!");
      });
  };
  console.log(watch("example"));

  return (
    <div className="shipment-main-div">
      <div className="row container">
        <div
          style={{ display: shippingData ? "none" : "block" }}
          className="col-md-6"
        >
          <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              name="name"
              defaultValue={loggedInUser.name}
              ref={register({ required: true })}
              placeholder="your name"
            />
            {errors.name && <span>name is required</span>}

            <input
              name="email"
              defaultValue={loggedInUser.email}
              ref={register({ required: true })}
              placeholder="your email"
            />
            {errors.email && <span>email is required</span>}

            <input
              name="address"
              ref={register({ required: true })}
              placeholder="your address"
            />
            {errors.address && <span>address is required</span>}

            <input
              name="phone"
              ref={register({ required: true })}
              placeholder="your phone"
            />
            {errors.phone && <span>phone is required</span>}
            {/* <select className="option-field" name="gender" ref={register}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select> */}
            <input id="submit-btn" type="submit" />
          </form>
        </div>
        <div
          style={{ display: shippingData ? "block" : "none" }}
          className="col-md-6"
        >
          <ProcessPayment
            handlePaymentSuccess={handlePaymentSuccess}
          ></ProcessPayment>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
