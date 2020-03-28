import React, { useState, useEffect } from "react";
import axios from "axios";

const AddBuilding = ({ currentAppData, setCurrentAppData }) => {
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
    
    event.preventDefault();

    let newInstrument;

    newInstrument = {
        keyterms: keytermsArr
    }

    axios
      .post("http://localhost:5000/api/listings/", newInstrument)
      .then(res => console.log(currentAppData))
      .then(console.log("success!"));
    console.log("Added!");

  };

  return (
    <div class="col">
      <form
        onSubmit={handleSubmit}
      >
        <div class="form-group">
         <h2>Add New Instrument</h2>
        <input class="form-control" 
        type="text"
        placeholder={"Enter individual keyterms separated by commas"}
        keyterms={keyterms}
        onChange={event => setKeyterms(event.target.value)}
        />
        <input class="form-control"
          type="submit"
          value="Submit"
        />
        </div>
      </form>
    </div>
  );
};
export default AddBuilding;
