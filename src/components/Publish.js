import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Publish({ tokenFromCookie, user }) {
  let history = useHistory();
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [prix, setPrix] = useState("");

  return (
    <div>
      {/*   {tokenFromCookie ? ( */}
      <form
        onSubmit={async event => {
          event.preventDefault();

          const formData = new FormData();

          // Data formData, on aura des fichiers et aussi des variables de type string, number, object, etc.
          formData.append("username", user);
          formData.append("picture", file);
          formData.append("title", title);
          formData.append("price", prix);
          //formData.append("id", id);

          try {
            const response = await axios.post(
              `https://leboncoin-api.herokuapp.com/api/offer/publish`,
              formData,
              {
                headers: {
                  Authorization: "Bearer " + tokenFromCookie,
                  "Content-Type": "multipart/form-data"
                }
              }
            );
            console.log("response.data in /publish=>", response.data);

            const id = response.data._id;
            history.push(`/offer/${id}`);

            alert(JSON.stringify(response.data));
          } catch (err) {
            if (err.response.status === 500) {
              console.error("An error occurred");
            } else {
              console.error(err.response.data.msg);
            }
          }
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={event => {
              const title = event.target.value;
              setTitle(title);
            }}
          />

          <input
            type="text"
            placeholder="Texte de l'annonce"
            style={{ height: 100, width: 200 }}
            value={text}
            onChange={event => {
              const text = event.target.value;
              setText(text);
            }}
          />

          <input
            type="text"
            placeholder="Prix"
            value={prix}
            onChange={event => {
              const prix = event.target.value;
              setPrix(prix);
            }}
          />

          <input
            type="file"
            onChange={event => {
              const file = event.target.files[0];
              setFile(file);
            }}
          />

          <input type="submit" />
        </div>
      </form>
      {/*    ) : null} */}
    </div>
  );
}
