import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../components/image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Header = ({ user, setUser, username }) => {
  const history = useHistory();
  return (
    <>
      <header
        style={{
          display: "flex"
        }}
      >
        <div className="nav" style={{ display: "flex" }}>
          <div>
            <img
              style={{ height: 30, width: 120 }}
              className="logo"
              src={logo}
              alt="logo"
            />
          </div>
          {user === null ? (
            <Link to="/log_in">
              <div style={{ display: "flex" }}>
                <button
                  className="btn-annonce"
                  style={{ backgroundColor: "#F16B16" }}
                >
                  <i class="faPlusSquare"></i>Déposer une annonce
                </button>
              </div>
            </Link>
          ) : (
            <Link to="/publish">
              <div>
                <button
                  className="btn-annonce"
                  style={{ backgroundColor: "#F16B16" }}
                >
                  <FontAwesomeIcon icon="faPlusSquare" />
                  Déposer une annonce
                </button>
              </div>
            </Link>
          )}
          <div>
            <input className="btn-rechercher" placeholder="Rechercher" />
          </div>
        </div>
        {user === null ? (
          <Link to="/log_in">
            <div className="se-connecter">
              <button className="btn-se-connecter">Se connecter</button>
            </div>
          </Link>
        ) : (
          <div className="se-connecter">
            <button
              onClick={() => {
                // En se déconnectant :
                // 1. Suppression du cookie userToken
                Cookies.remove("userToken");
                // 2. Mettre l'état user à null
                setUser(null);
                // 3. Aller sur la page d'accueil
                history.push("/");
              }}
            >
              Se déconnecter
            </button>
            <p>{console.log(username)}</p>
          </div>
        )}
      </header>
    </>
  );
};
export default Header;
