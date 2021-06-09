import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getActivityById } from '../../helpers/data/activitydata';
import { getBabyById } from '../../helpers/data/babyData';

export default function PhotoCard({ photo }) {
  const [activity, setActivity] = useState([]);
  const [baby, setBaby] = useState([]);

  const getActivity = (activityId) => {
    getActivityById(activityId).then((response) => {
      setActivity(response);
    });
  };

  const getBaby = (babyId) => {
    getBabyById(babyId).then((response) => {
      setBaby(response);
    });
  };

  useEffect(() => {
    const { activityId } = photo;
    if (activityId) {
      getActivity(activityId);
    }
  }, [activity]);

  useEffect(() => {
    const { childId } = photo;
    if (childId) {
      getBaby(childId);
    }
  }, [baby]);

  const mealConvert = () => {
    if (activity.mealType === 0) {
      return 'Vegetable';
    } if (activity.mealType === 1) {
      return 'Fruit';
    } if (activity.mealType === 2) {
      return 'Meat';
    } if (activity.mealType === 3) {
      return 'Poop';
    }
    return 'ERROR';
  };

  return (
    <div>
      <div className='card photos-card'>
        <img className='photos-image card-img-top' src={photo.imageUrl} alt='Card image cap' />
        <div className='card-body'>
          <p className='card-text'>
            {photo.activityId ? (mealConvert()) : (baby.firstName)}
          </p>
        </div>
      </div>
    </div>
  );
}

PhotoCard.propTypes = {
  photo: PropTypes.any,
};
