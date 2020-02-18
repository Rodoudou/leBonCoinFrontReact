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
      console.log("response.data : /Offers=>", data);
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
                <li key={offer._id}>
                  <Link to={"/offer/" + offer._id}>
                    <div>{offer.title}</div>
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
