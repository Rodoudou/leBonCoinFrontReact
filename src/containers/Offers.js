import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Offers() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://leboncoin-api.herokuapp.com/api/offer/with-count`
      );
      setData(response.data);
      setIsLoading(false);
      console.log("response.data : /Offers=>", response.data.offers);
    };
    fetchData();
  }, []);
  return (
    <div>
      {isLoading ? (
        <p>En chargement...</p>
      ) : (
        <div>
          <ul>
            {data.offers.map((offer, index) => {
              return (
                <li key={offer._id} style={{ listStyle: "none" }}>
                  <Link to={"/offer/" + offer._id} style={{ display: "flex" }}>
                    <div style={{ backgroundColor: "#CAD1D9" }}>
                      <div style={{ backgroundColor: "#FFFFFF" }}>
                        <img
                          src={offer.pictures[0]}
                          style={{ height: 180, width: 240, marginRight: 5 }}
                          alt={offer.title}
                        />
                      </div>

                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p>{offer.title}</p>
                        <p>{offer.price}</p>
                        <p>{offer.description}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
