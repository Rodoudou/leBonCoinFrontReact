import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useHistory } from "react-router-dom";

export default function LogIn({ user, setUser }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <span>
      <div>
        <form
          onSubmit={async event => {
            event.preventDefault();
            console.log(email);
            console.log(password);

            try {
              const response = axios.post(
                `https://leboncoin-api.herokuapp.com/api/user/log_in`,
                { email, password }
              );
              if (response.data.token) {
                //Connexion reussie!
                console.log("response.data => /login", response.data);

                //1- Appeler le serveur pour transmettre le token
                const token = response.data.token;

                //2- Sauvegarder le token dans les cookies
                Cookies.set("userToken", token, { experies: 2000 });
                //3- Remplacer le bouton "Se connecter" par "Se déconnecter"
                setUser({
                  token: token
                });
                //4 Aller sur la page d'accueil
                // Link sert à afficher un buton, nous allons donc utiliser history.push pour changer de page immediatement
                history.push("/");
              } else {
                //Connexion échouée
                alert("Token is missing");
              }
            } catch (error) {
              alert("Identifiants incorrects");
            }
          }}
        >
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={event => {
              const email = event.target.value;
              setEmail(email);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={event => {
              const password = event.target.value;
              setPassword(password);
            }}
          />
          <button type="submit">Se connecter</button>
        </form>
        <Link to="/sign_up">S'inscrire</Link>
      </div>
    </span>
  );
}
