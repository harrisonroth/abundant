import React, { useEffect, useState } from 'react';
import { makeGet } from '../../Shared/Utils/request';

export const AdminView = props => {
  const [users, setUsers] = useState([]);
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    makeGet('/users/', setUsers);
  }, []);

  useEffect(() => {
    makeGet('/bottles/', setContainers);
  }, []);

  if (props.user.admin) {
    return (
      <div>
        <div className='content_header'>
          <h1>Admin Portal</h1>
        </div>
        <div className='content'>
          <div className='row'>
            <div className='left'>No. of Users: {users.length}</div>
            <div className='right'>No. of Containers: {containers.length}</div>
          </div>
          <div></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
