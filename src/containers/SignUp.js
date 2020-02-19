import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import "../SignUp.css";

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();
  return (
    <div className="container">
      <h1 style={{ marginTop: 100 }}>Créer un compte</h1>
      <form
        onSubmit={async event => {
          event.preventDefault();

          const result = username.match(/^[a-z0-9_-]{3,15}$/);
          if (result === null) {
            alert("le username n'est pas valide");
            return;
          }

          // 1. Valider le formulaire
          // Vérifier les données sont corrects (password1 === password2)
          if (password1 === password2) {
            // 2. Appeler le serveur

            try {
              const response = await axios.post(
                "https://leboncoin-api.herokuapp.com/api/user/sign_up",
                {
                  email,
                  username,
                  password: password1
                }
              );

              console.log(response.data);

              if (response.data.token) {
                const token = response.data.token;

                // 1. Sauvegarder le token dans les cookies
                Cookies.set("userToken", token, { expires: 2000 });

                // 2. Remplacer le bouton "Se connecter" du header par "Se déconnecter"
                setUser({
                  token: token
                });

                // 3. Aller sur la page d'accueil
                // Link sert à afficher un bouton, nous allons donc utiliser history.push pour changer de page immediatement
                history.push("/");
              }
            } catch (error) {
              alert("An error occurred");
              console.log("error.message = ", error);
            }
          }
        }}
      >
        <span>User Name</span>
        <input
          type="text"
          value={username}
          onChange={event => {
            setUsername(event.target.value);
          }}
        />
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <div className="passWord">
          <div className="passWord1">
            <span>Password</span>
            <input
              type="password"
              value={password1}
              onChange={event => {
                setPassword1(event.target.value);
              }}
            />
          </div>
          <div className="conf--passWord">
            <span>Confirm Password</span>
            <input
              type="password"
              value={password2}
              onChange={event => {
                setPassword2(event.target.value);
              }}
            />
          </div>
        </div>

        <input type="submit" value="S'inscrire" />
      </form>
    </div>
  );
};

export default SignUp;
