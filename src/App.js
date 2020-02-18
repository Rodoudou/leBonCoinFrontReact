import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./containers/CheckoutForm";

import Header from "./components/Header";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import LogIn from "./containers/LogIn";
import SignUp from "./containers/SignUp";
import Publish from "./components/Publish";
import Payment from "./containers/Payment";

function App() {
  const tokenFromCookie = Cookies.get("userToken");
  let newState;
  if (tokenFromCookie) {
    newState = { token: tokenFromCookie };
  } else {
    newState = null;
  }
  const [user, setUser] = useState(newState);

  return (
    <StripeProvider apiKey="pk_test_YOUR_PUBLIC_API_KEY">
      <Router>
        <Header user={user} setUser={setUser} />
        <Switch>
          <Route exact path="/">
            <Offers />
          </Route>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/log_in">
            <LogIn user={user} setUser={setUser} />
          </Route>
          <Route path="/sign_up">
            <SignUp user={user} setUser={setUser} />
          </Route>
          <Route path="/publish">
            <Publish tokenFromCookie={tokenFromCookie} user={user} />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
        </Switch>
        {/* #######################"" */}
        <Elements>
          <CheckoutForm />
        </Elements>
        {/* #############################"" */}
      </Router>
    </StripeProvider>
  );
}

export default App;
