import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import { babyPooped } from '../../helpers/data/activitydata';
import Modal from '../Modal';
import EditBaby from '../Forms/EditBaby';
import getUid from '../../helpers/data/authData';
import { getUserById } from '../../helpers/data/userData';

export default function BabyCard({ baby }) {
  const [user, setUser] = useState([]);
  const { addToast } = useToasts();
  const date = new Date(baby.birthday);
  const ageForCalc = baby.birthday;
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      childId: baby.id
    };
    babyPooped(obj).then((response) => {
      if (response) {
        addToast('The poop has been documented!', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
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

  const thisAgeThing = (bday) => {
    const dob = bday;
    const myDob = dob.split('T')[0].split('-').join(', ');
    const ctrlDob = new Date(myDob);

    const cur = moment().format();
    const myDate = cur.split('T')[0].split('-').join(', ');
    const ctrlDoa = new Date(myDate);

    const diff = new Date(ctrlDoa.getTime() - ctrlDob.getTime());

    const year = diff.getUTCFullYear() - 1970;
    const month = diff.getUTCMonth();
    const day = diff.getUTCDate() - 1;
    if (year !== 0 && month !== 0 && day !== 0) {
      return (`${year}yr, ${month}mo, and ${day} day(s)`);
    }
    if (year !== 0 && month !== 0 && day === 0) {
      return (`${year}yr, and ${month}mo`);
    }
    if (year !== 0 && month === 0 && day !== 0) {
      return (`${year}yr and ${day} day(s)`);
    }
    if (year !== 0 && month === 0 && day === 0) {
      return (`${year}yr(s)`);
    }
    if (year === 0 && month !== 0 && day !== 0) {
      return (`${month}mo and ${day} day(s)`);
    }
    if (year === 0 && month !== 0 && day === 0) {
      return (`${month}mo(s)`);
    }
    if (year === 0 && month === 0 && day !== 0) {
      return (`${day} day(s)`);
    }
    return 'Pretty Old';
  };
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">{thisAgeThing(ageForCalc)}</CardSubtitle>
          <CardText>Born {date.toDateString()}</CardText>
          <CardText>{baby.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

BabyCard.propTypes = {
  baby: PropTypes.any
};
