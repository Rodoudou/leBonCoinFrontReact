import React, { useState } from "react";
import axios from "axios";
import { CardElement, injectStripe } from "react-stripe-elements";

const CheckoutForm = ({ stripe }) => {
  const [complete, setComplete] = useState(false);
  return !complete ? (
    <div className="checkout">
      <p>Would you like to complete the purchase?</p>
      {/* 1. On affiche le formulaire de carte bleue */}
      <CardElement />
      <button
        onClick={async event => {
          // 2. on envoie le numéro de carte à Stripe
          const stripeResponse = await stripe.createToken({
            name: "Identifiant de l'acheteur"
          });
          if (stripeResponse.error) {
            alert(stripeResponse.error.message);
          } else {
            // 4. Stripe nous retourne un token
            console.log("stripeResponse.token", stripeResponse.token);
            // 5. on envoie ce token au backend
            const paymentResponse = await axios.post(
              "http://localhost:4001/pay",
              {
                token: stripeResponse.token.id
              }
            );
            console.log("paymentResponse", paymentResponse);
            // 10. Le backend nous confirme que le paiement a été effectué
            if (paymentResponse.status === 200) {
              setComplete(true);
            } else {
              alert("An error occurred");
              console.error(paymentResponse);
            }
          }
        }}
      >
        Send
      </button>
    </div>
  ) : (
    <span>Purchase Complete</span>
  );
};
export default injectStripe(CheckoutForm);
