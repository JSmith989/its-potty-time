import React, { useState, useEffect } from 'react';
import { getUserById } from '../../helpers/data/userData';
import getUid from '../../helpers/data/authData';

const Profile = () => {
  const [user, setUser] = useState([]);

  const getUser = (userId) => {
    getUserById(userId).then((response) => {
      setUser(response);
    })
      .catch((err) => console.warn('get user did not work', err));
  };

  useEffect(() => {
    const userId = getUid();
    if (userId) {
      getUser(userId);
    }
  }, [user]);
  return (
    <div className="yourProfile">
    <div className="card">
        <div className="second d-flex flex-row">
            <div> <img className="image" src={user.imageUrl} /> </div>
                <div className="about d-flex flex-column"> <h2 className="yourName">{user.firstName} {user.lastName}</h2>
                <div className="description"> <p>{user.description}</p></div>
                </div>
        </div>
    </div>
</div>
  );
};

export default Profile;
