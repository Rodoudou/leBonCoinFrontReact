import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();
  return (
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
      <input
        placeholder="Username"
        type="text"
        value={username}
        onChange={event => {
          setUsername(event.target.value);
        }}
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={event => {
          setEmail(event.target.value);
        }}
      />
      <input
        placeholder="Password 1"
        type="password"
        value={password1}
        onChange={event => {
          setPassword1(event.target.value);
        }}
      />
      <input
        placeholder="Password 2"
        type="password"
        value={password2}
        onChange={event => {
          setPassword2(event.target.value);
        }}
      />
      <input type="submit" value="S'inscrire" />
    </form>
  );
};

export default SignUp;
