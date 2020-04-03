import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table'
import Search from "./Search";

const UserList = ({ filterText, setUser }) => {
  const [fetch, setFetch] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const result = await axios.get("api/users/");
    setUsers(result.data);
    console.log(users);
    setFetch(false);
  };

  useEffect(() => {
    console.log("User list mounted or updated");
    fetchData();
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
            <th>User Info</th>
            <th>User Management</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((item, index) => {
            return (
              <Fragment>
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => setUser(users.find(x => x._id === item._id))}
                    >
                      View User Info
                    </Button>
                  </td>
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
 
