import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

export default function BabyCard({ baby }) {
  const date = new Date(baby.birthday);
  return (
        <div className="babyContainer">
      <Card className="babyContent">
        <div className="poop-button-container">
          <button className="poopButton"><i className="fas fa-poo fa-lg"></i></button>
          </div>
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
