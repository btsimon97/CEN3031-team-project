import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

const InstrumentList = ({
  filterText,
  currentAppData,
  setCurrentAppData,
  setInstrument
}) => {
  const [fetch, setFetch] = useState(false);

  const fetchData = async () => {
    const result = await axios.get("api/listings/");
    setCurrentAppData(result.data.data);
    setFetch(false);
  };

  useEffect(() => {
    console.log("List mounted or updated");
    fetchData();
  }, [fetch, setFetch]);

  const handleDelete = async id => {
    let res = await axios.delete(`api/listings/${id}`);
    setFetch(true);
  };

  console.log(currentAppData);
  let instrumentList = currentAppData.filter(building => {
    if (filterText.trim() !== "") {
      let regExp = new RegExp(escape(filterText.trim().toLowerCase()));
      let searchText = filterText.split(",");
      if (searchText.length > 1) {
        let multipleSearch = "";
        let j = 0;
        for (; j < searchText.length; j++) {
          let word = "(?=.*" + searchText[j] + ")";
          multipleSearch += word
            .trim()
            .toLowerCase()
            .replace(/ /g, "");
        }
        regExp = new RegExp(multipleSearch + ".+", "gi");
      }
      console.log(building.keyterms.toString().replace(/,/g, " "));
      if (building) {
        if (
          regExp.test(
            building.keyterms
              .toString()
              .replace(/,/g, " ")
              .toLowerCase()
              .trim()
          )
        ) {
          return true;
        }
      }
      return false;
    }
    return true;
  });

  return (
    <div>
      {instrumentList.map((item, index) => {
        return (
          <Fragment>
            <tr key={index}>
              <td>{item.keyterms.toString()}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    setInstrument(currentAppData.find(x => x._id === item._id));
                  }}
                >
                  View Info
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(item._id)}>
                  Delete Item
                </Button>
              </td>
            </tr>
          </Fragment>
        );
      })}
    </div>
  );
};
export default InstrumentList;
