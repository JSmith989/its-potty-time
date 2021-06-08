import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { babyPooped } from '../../helpers/data/activitydata';
import Modal from '../Modal';
import EditBaby from '../Forms/EditBaby';
import getUid from '../../helpers/data/authData';
import { getUserById } from '../../helpers/data/userData';

export default function BabyCard({ baby }) {
  const [user, setUser] = useState([]);
  const date = new Date(baby.birthday);
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      childId: baby.id
    };
    babyPooped(obj).then((response) => {
      console.warn(response.data);
    });
    // then take to a success message or popup
  };

  const getUser = (userId) => {
    getUserById(userId).then((response) => {
      setUser(response);
    }).catch((err) => console.warn('error', err));
  };

  useEffect(() => {
    const userId = getUid();
    if (userId) {
      getUser(userId);
    }
  }, [user]);
  return (
        <div className="babyContainer">
      <Card className="babyContent">
        <form className="poop-button-container">
          <button className="poopButton" type="button" id={baby.id} onClick={(e) => { handleSubmit(e); } }><i className="fas fa-poo fa-lg"></i></button>
          </form>
        <CardImg top width="100%" className="babyImage" src={baby.imageUrl} alt="Card image cap" />
        <CardBody>
          <Modal title={'Edit'} btnStyle={'cool-button'} buttonLabel={'Edit'}>
            <EditBaby
            baby={baby}
            key={baby.id}
            user={user}
            />
          </Modal>
          <CardTitle tag="h5">{baby.firstName} {baby.lastName}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Age: {baby.age}</CardSubtitle>
          <CardText>Birthday: {date.toDateString()}</CardText>
          <CardText>{baby.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

BabyCard.propTypes = {
  baby: PropTypes.any
};
