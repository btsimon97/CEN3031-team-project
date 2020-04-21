import React, { useState, useEffect, Fragment, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Search from './Search';

import { GlobalContext } from '../context/GlobalState';
import { useHistory } from 'react-router-dom';

const UserList = ({ filterText, setUser }) => {
  const [fetch, setFetch] = useState(false);
  // const [users, setUsers] = useState([]);
  const { users, getUsers, currentUser, setSelectedUser } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, [fetch, setFetch]);

  const handleDelete = async (id) => {
    console.log('handle delete', id);
    await axios.delete(`api/users/${id}`);
    setFetch(true);
  };

  const handleUpdate = async (id) => {
    console.log('handle update', id);
    let res = await axios.get(`api/users/${id}`);
    console.log(res.data);
    setSelectedUser(res.data);
    history.push('/profile');
  };
  const userList = users.filter((user) => {
    if (filterText && filterText.trim() !== '') {
      const regExp = new RegExp(escape(filterText.trim().toLowerCase()));
      if (user) {
        const result = user.name.trim().toLowerCase().match(regExp);
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
          {<th>User Name</th>}
          {<th>User Email</th>}
          {currentUser.isAdmin && <th>User Management</th>}
        </tr>
      </thead>
      <tbody>
        {userList.map((item, index) => {
          return (
            <Fragment key={item._id}>
              <tr onMouseOver={() => setUser(users.find((x) => x._id === item._id))}>
                {(!item.isAdmin || currentUser.isAdmin) && <td>{item.name}</td>}
                {(!item.isAdmin || currentUser.isAdmin) && <td>{item.email}</td>}
                {currentUser.isAdmin && (
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(item._id)}>
                      Delete User
                    </Button>
                  </td>
                )}
                {currentUser.isAdmin && (
                  <td>
                    <Button variant="info" onClick={() => handleUpdate(item._id)}>
                      Update User
                    </Button>
                  </td>
                )}
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};
export default UserList;
