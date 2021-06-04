import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { babyPooped } from '../../helpers/data/activitydata';

export default function BabyCard({ baby }) {
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
  return (
        <div className="babyContainer">
      <Card className="babyContent">
        <form className="poop-button-container">
          <button className="poopButton" type="button" id={baby.id} onClick={(e) => { handleSubmit(e); } }><i className="fas fa-poo fa-lg"></i></button>
          </form>
        <CardImg top width="100%" className="babyImage" src={baby.imageUrl} alt="Card image cap" />
        <CardBody>
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
