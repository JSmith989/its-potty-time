import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getActivityImages } from '../helpers/data/activitydata';
import ActivityPhoto from '../components/Cards/ActivityPhoto';
import { getPhotoByBabyId } from '../helpers/data/picturesData';
import PhotoCard from '../components/Cards/PhotoCard';

export default function Pictures(props) {
  const [activities, setActivities] = useState([]);
  const [photos, setPhotos] = useState([]);

  const getActivities = (babyId) => {
    getActivityImages(babyId).then((response) => {
      setActivities(response);
    });
  };

  const getBabyPhotos = (babyId) => {
    getPhotoByBabyId(babyId).then((response) => {
      setPhotos(response);
    });
  };

  useEffect(() => {
    const babyId = props.match.params.id;
    if (babyId) {
      getActivities(babyId);
    }
  }, [activities]);

  useEffect(() => {
    const babyId = props.match.params.id;
    if (babyId) {
      getBabyPhotos(babyId);
    }
  }, [photos]);

  const showPictures = () => (
    activities.map((activity) => <ActivityPhoto key={activity.id} activity={activity} />)
  );

  const showPhotos = () => (
    photos.map((photo) => <PhotoCard key={photo.id} photo={photo} />)
  );

  return (
        <div>
            <h2>Pictures</h2>
            <div className="photos">
            {showPictures()}
            {showPhotos()}
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
