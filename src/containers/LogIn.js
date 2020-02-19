import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import "../Login.css";
export default function LogIn({ user, setUser }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <span>
      <div className="modal" style={{ marginTop: 300 }}>
        <h2 className="connexion">Connexion</h2>
        <hr className="separateur" />
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
          <span className="spanForm">Adresse email</span>
          <input
            type="email"
            value={email}
            onChange={event => {
              const email = event.target.value;
              setEmail(email);
            }}
          />
          <span className="spanForm">Mot de passe</span>
          <input
            type="password"
            value={password}
            onChange={event => {
              const password = event.target.value;
              setPassword(password);
            }}
          />
          <button className="btn--seConnecter" type="submit">
            Se connecter
          </button>
          <hr className="separateur--bas" />
          <h3>Vous n'avez pas de compte ?</h3>
          <Link to="/sign_up">
            <button className="btn--Inscription">Créer un compte</button>
          </Link>
        </form>
      </div>
    </span>
  );
}
