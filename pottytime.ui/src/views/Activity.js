import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getActivityById } from '../helpers/data/activitydata';
import { getBabyById } from '../helpers/data/babyData';

export default function Activity(props) {
  const [activity, setActivity] = useState([]);
  const [baby, setBaby] = useState([]);
  const history = useHistory();

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
    const { activityId } = props.match.params;
    if (activityId) {
      getActivity(activityId);
    }
  }, [activity]);

  useEffect(() => {
    const { babyId } = props.match.params;
    if (babyId) {
      getBaby(babyId);
    }
  }, [baby]);

  const goBackToCalendar = () => {
    const { babyId } = props.match.params;
    return history.push(`/calendar/${babyId}`);
  };

  const enumConvert = () => {
    if (activity.activityType === 0) {
      return 'poop!';
    } if (activity.activityType === 1) {
      return 'breakfast!';
    } if (activity.activityType === 2) {
      return 'lunch!';
    } if (activity.activityType === 3) {
      return 'dinner!';
    }
    return 'No Activity';
  };

  const truthDetector = () => {
    if (activity.isAllergy) {
      return 'This meal caused an allergic reaction.';
    }
    return 'This meal did not cause an allergic reaction!';
  };

  const date = new Date(activity.date);

  return (
    <>
      {activity.activityType === 0 ? (
        <div className="p-5">
          <div className='card text-center'>
            <div className='card-header d-flex justify-content-around'>
              <i className="poopButton fas fa-poo fa-lg"></i>
              <i className="poopButton fas fa-poo fa-lg"></i>
              <i className="poopButton fas fa-poo fa-lg"></i>
              <i className="poopButton fas fa-poo fa-lg"></i>
              <i className="poopButton fas fa-poo fa-lg"></i>
              <i className="poopButton fas fa-poo fa-lg"></i>
              <i className="poopButton fas fa-poo fa-lg"></i>
              <i className="poopButton fas fa-poo fa-lg"></i>
              </div>
            <div className='card-body'>
              <h5 className='card-title'>{baby.firstName}&apos;s {enumConvert()}</h5>
              <p className='card-text'>
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <button onClick={goBackToCalendar} className='cool-button'>
               {baby.firstName}&apos;s Calendar
              </button>
            </div>
            <div className='card-footer text-muted'>{date.toDateString()}</div>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <div className='card text-center'>
            <div className='card-header food-awesome d-flex justify-content-around'>
            <i className="fas fa-pizza-slice fa-lg"></i>
              <i className="fas fa-coffee fa-lg"></i>
              <i className="fas fa-drumstick-bite fa-lg"></i>
              <i className="fas fa-apple-alt fa-lg"></i>
              <i className="fas fa-fish fa-lg"></i>
              <i className="fas fa-carrot fa-lg"></i>
              <i className="fas fa-hotdog fa-lg"></i>
              <i className="fas fa-pepper-hot fa-lg"></i>
              <i className="fas fa-hamburger fa-lg"></i>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>{baby.firstName}&apos;s {enumConvert()}</h5>
              <p className='card-text'>
                {activity.description}
              </p>
              <p className='card-text'>
                {truthDetector()}
              </p>
              <button onClick={goBackToCalendar} className='cool-button'>
              {baby.firstName}&apos;s Calendar
              </button>
            </div>
            <div className='card-footer text-muted'>{date.toDateString()}</div>
          </div>
        </div>
      )}
    </>
  );
}

Activity.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      activityId: PropTypes.any,
      babyId: PropTypes.any
    }),
  }),
};
