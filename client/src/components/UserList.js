import React, { useState, useEffect, Fragment, useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import Search from "./Search";

import { GlobalContext } from "../context/GlobalState";

const UserList = ({ filterText, setUser }) => {
  const [fetch, setFetch] = useState(false);
  // const [users, setUsers] = useState([]);
  const { users, getUsers } = useContext(GlobalContext);

  useEffect(() => {
    getUsers();
  }, [fetch, setFetch]);

  const handleDelete = async (id) => {
    console.log("handle delete", id);
    await axios.delete(`api/users/${id}`);
    setFetch(true);
  };
  const userList = users.filter(user => {
    if (filterText && filterText.trim() !== "") { 
      const regExp = new RegExp(escape(filterText.trim().toLowerCase()));
      if (user) {
        const result = user.name
          .trim()
          .toLowerCase()
          .match(regExp);
        return result && result.length > 0;
      }
      return false;
    }
    return true;
  });

  return (
      <Table hover striped responsive>
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>User Management</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((item, index) => {
            return (
              <Fragment key={item._id}>
                <tr onMouseOver={() => setUser(users.find(x => x._id === item._id))}>
                  <td >{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(item._id)}>
                      Delete User
                    </Button>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
    </Table>
  );
};
export default UserList;
 
