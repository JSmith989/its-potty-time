import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getActivityImages } from '../helpers/data/activitydata';
import ActivityPhoto from '../components/Cards/ActivityPhoto';

export default function Pictures(props) {
  const [activities, setActivities] = useState([]);

  const getActivities = (babyId) => {
    getActivityImages(babyId).then((response) => {
      setActivities(response);
    });
  };

  useEffect(() => {
    const babyId = props.match.params.id;
    if (babyId) {
      getActivities(babyId);
    }
  }, [activities]);

  const showPictures = () => (
    activities.map((activity) => <ActivityPhoto key={activity.id} activity={activity} />)
  );

  return (
        <div>
            <h2>Pictures</h2>
            <div className="photos">
            {showPictures()}
            </div>
        </div>
  );
}

Pictures.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.any
    }),
  }),
};
