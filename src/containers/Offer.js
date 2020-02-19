import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Redirect, useHistory } from "react-router-dom";
export default function Offer({ user }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://leboncoin-api.herokuapp.com/api/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
      console.log("account.data =>", response.data);
    };
    fetchData();
  }, [id]);
  return (
    <div className="offer">
      {isLoading ? (
        <p>En Chargement...</p>
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{data.title}</span>
            <img src={data.pictures[0]} alt={data.title} />
          </div>
          {/*      <p>{console.log("username=>", username)}</p> */}
          {user === null ? (
            <Redirect push to="/log_in" />
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>{data.creator.account.username}</span>
              <button
                onClick={() => {
                  history.push("/payment", {
                    title: data.title,
                    picture: data.pictures[0],
                    description: data.description,
                    price: data.price
                  });
                }}
              >
                Acheter
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/*   
  <Link
              to="/payement"
              style={{ textDecoration: "none" }}
              title={data.title}
            >
              {/*   history.push("/payment", { title: data.title });  */

/*     <p
                style={{
                  fontWeight: "bold",
                  fontSize: 23
                }}
              >
                {data.creator.account.username}
              </p>
              {console.log("data => /Offer", data)}
              <button
                style={{
                  backgroundColor: "orange",
                  border: "none",
                  borderRadius: 3,
                  color: "white"
                }}
              >
                Acheter
              </button>
            </Link> */
