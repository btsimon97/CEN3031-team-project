import React, { useState, useEffect } from "react";
import axios from "axios";

const AddBuilding = ({ currentAppData, setCurrentAppData }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [keyterms, setKeyterms] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/listings/")
      .then(response => {
        setCurrentAppData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = event => {
    let keytermsArr = keyterms.split(",")
    console.log(keytermsArr);
    event.preventDefault();
    let newBuilding;
    if (address) {
      newBuilding = {
        id: currentAppData.length + 1,
        code: code,
        name: name,
        coordinates: {
          longitude: longitude,
          latitude: latitude
        },
        address: address,
        keyterms: keytermsArr
      };
    } else {
      newBuilding = {
        id: currentAppData.length + 1,
        code: code,
        name: name,
        keyterms: keytermsArr
      };
    }
    const newList = [...currentAppData, newBuilding];

    console.log(newList);
    setCurrentAppData(newList);
    axios
      .post("http://localhost:5000/api/listings/", newBuilding)
      .then(res => console.log(res.data))
      .then(console.log("success!"));
    console.log("Added!");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          position: "absolute",
          left: "-700px",
          top: "200px",
          height: "20px"
        }}
      >
        <p
          style={{
            fontSize: "36px",
            fontFamily: "New Times Roman"
          }}
        >
          {" "}
          Fill out the fields to add a new instrument{" "}
        </p>{" "}
        <input
          style={{
            width: "800px",
            height: "50px"
          }}
          type="text"
          placeholder={"Enter keyterms "}
          keyterms={keyterms}
          onChange={event => setKeyterms(event.target.value)}
        />{" "}
        <input
          style={{
            width: "400px",
            height: "50px",
            backgroundColor: "green",
            color: "white"
          }}
          type="submit"
          value="Submit"
        />
      </form>{" "}
    </div>
  );
};
export default AddBuilding;
