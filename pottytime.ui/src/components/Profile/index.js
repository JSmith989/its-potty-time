import React, { useState, useEffect } from 'react';
import { getUserById } from '../../helpers/data/userData';
import getUid from '../../helpers/data/authData';
import Modal from '../Modal';
import AddDescription from '../Forms/AddDescription';
import EditUserForm from '../Forms/EditUserForm';

const Profile = () => {
  const [user, setUser] = useState([]);

  const getUser = (userId) => {
    getUserById(userId).then((response) => {
      setUser(response);
    })
      .catch((err) => console.warn('get user did not work', err));
  };

  const addDescription = () => <Modal title={'Add Description'} btnStyle={'add-desc'} buttonLabel={'Add Description'}>
      <AddDescription
        user={user}
        key={user.id}
      />
    </Modal>;

  const editDescription = () => <Modal title={'Edit Info'} btnStyle={'cool-button'} buttonLabel={'Edit'}>
      <EditUserForm
        user={user}
        key={user.id}
      />
    </Modal>;

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
            <div>
                <img className="image p-2" src={user.imageUrl} />
                {editDescription()}
            </div>
                <div className="about d-flex flex-column"> <h2 className="yourName">{user.firstName} {user.lastName}</h2>
                <div className="description"> <p>{user.description ? user.description : addDescription()}</p></div>
                </div>
        </div>
    </div>
</div>
  );
};

export default Profile;
