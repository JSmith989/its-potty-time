import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { getActivityById, deleteActivity } from '../helpers/data/activitydata';
import { getBabyById } from '../helpers/data/babyData';
import Modal from '../components/Modal';
import EditActivityForm from '../components/Forms/EditActivityForm';
import PoopDescription from '../components/Forms/PoopDescription';

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
    }
    if (activity.activityType === 1) {
      return 'breakfast!';
    }
    if (activity.activityType === 2) {
      return 'lunch!';
    }
    if (activity.activityType === 3) {
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

  const deleteAct = (e) => {
    const { babyId } = props.match.params;
    deleteActivity(e.target.id);
    setTimeout(() => {
      history.push(`/calendar/${babyId}`);
    }, 100);
  };

  return (
    <>
      {activity.activityType === 0 ? (
        <div className='p-5'>
          <div className='card text-center'>
            <div className='card-header p-3 d-flex justify-content-around'>
              <i className='poopButton fas fa-poo fa-lg'></i>
              <i className='poopButton fas fa-poo fa-lg'></i>
              <i className='poopButton fas fa-poo fa-lg'></i>
              <i className='poopButton fas fa-poo fa-lg'></i>
              <i className='poopButton fas fa-poo fa-lg'></i>
              <i className='poopButton fas fa-poo fa-lg'></i>
              <i className='poopButton fas fa-poo fa-lg'></i>
              <i className='poopButton fas fa-poo fa-lg'></i>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>
                {baby.firstName}&apos;s {enumConvert()}
              </h5>
              <p className='card-text'>
                { activity.description ? (
                  <p>{activity.description}</p>
                ) : (
                  <Modal title={'Add Description'} btnStyle={'cool-button'} buttonLabel={'Add Description'}>
                  <PoopDescription
                   activity={activity}
                  key={activity.id}
                  />
                </Modal>
                )}
              </p>
              <div className='button-activity d-flex justify-content-evenly'>
              <button onClick={goBackToCalendar} className='cool-button'>
                {baby.firstName}&apos;s Calendar
              </button>
              <button type="button" id={activity.id} onClick={(e) => { deleteAct(e); } } className="cool-button-danger">Delete Activity</button>
              </div>
            </div>
            <div className='card-footer text-muted'>{date.toDateString()}</div>
          </div>
        </div>
      ) : (
        <div className='p-5'>
          <div className='card text-center'>
            <div className='card-header p-3 food-awesome d-flex justify-content-around'>
              <i className='fas fa-pizza-slice fa-lg'></i>
              <i className='fas fa-coffee fa-lg'></i>
              <i className='fas fa-drumstick-bite fa-lg'></i>
              <i className='fas fa-apple-alt fa-lg'></i>
              <i className='fas fa-fish fa-lg'></i>
              <i className='fas fa-carrot fa-lg'></i>
              <i className='fas fa-hotdog fa-lg'></i>
              <i className='fas fa-pepper-hot fa-lg'></i>
              <i className='fas fa-hamburger fa-lg'></i>
            </div>
            <div className='card-body'>
              <h5 className='card-title'>
                {baby.firstName}&apos;s {enumConvert()}
              </h5>
              <img
                src={activity.imageUrl}
                className='card-img-top activity-image'
                alt='...'
              ></img>
              <p className='card-text'>
                <StarRatings
                  rating={activity.rating}
                  starRatedColor='blue'
                  numberOfStars={5}
                  name='rating'
                />
              </p>
              <p className='card-text'>{activity.description}</p>
              <p className='card-text'>{truthDetector()}</p>
              <div className='button-activity d-flex justify-content-evenly'>
              <button onClick={goBackToCalendar} className='cool-button'>
                {baby.firstName}&apos;s Calendar
              </button>
              <Modal title={'Edit'} btnStyle={'cool-button'} buttonLabel={'Edit'}>
            <EditActivityForm
            baby={baby}
            activity={activity}
            key={activity.id}
            />
          </Modal>
          <button type="button" id={activity.id} onClick={(e) => { deleteAct(e); } } className="cool-button-danger">Delete Activity</button>
              </div>
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
      babyId: PropTypes.any,
    }),
  }),
};
