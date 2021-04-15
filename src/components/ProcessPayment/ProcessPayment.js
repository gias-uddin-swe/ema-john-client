import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";
import SplitForm from "./SplitForm";

const stripePromise = loadStripe(
  "pk_test_51Ie0nNJoyOci9H9DM8ewASa1jJfVzOGgfhziHVeYpCLGoNAL7yzwWHhjfIJxofWnt4VbnGmhi9du0GZxkPgGCIzU00xfTV5Y1Z"
);
const ProcessPayment = ({ handlePaymentSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm
        handlePaymentSuccess={handlePaymentSuccess}
      ></SimpleCardForm>
      {/* <SplitForm></SplitForm> */}
    </Elements>
  );
};

export default ProcessPayment;
