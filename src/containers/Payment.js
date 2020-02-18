import React from "react";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "react-stripe-elements";

export default function Payment() {
  const location = useLocation();

  const { title, description, price, picture } = location.state;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Acheter en ligne</h2>
      <img style={{ height: 30, width: 100 }} src={picture} alt={picture}></img>
      <span>{title} </span>
      <span>{description}</span>
      <span style={{ color: "orange" }}>{price}</span>

      <h2>Vos coordonnées bancaires</h2>
      <Elements>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
