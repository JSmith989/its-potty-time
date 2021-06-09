import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getActivityImages } from '../helpers/data/activitydata';
import ActivityPhoto from '../components/Cards/ActivityPhoto';
import { getPhotoByBabyId } from '../helpers/data/picturesData';
import { getBabyById } from '../helpers/data/babyData';
import PhotoCard from '../components/Cards/PhotoCard';
import Modal from '../components/Modal';
import AddPhoto from '../components/Forms/AddPhoto';

export default function Pictures(props) {
  const [activities, setActivities] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [baby, setBaby] = useState([]);

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

  const getBaby = (babyId) => {
    getBabyById(babyId).then((response) => {
      setBaby(response);
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

  useEffect(() => {
    const babyId = props.match.params.id;
    if (babyId) {
      getBaby(babyId);
    }
  }, [baby]);

  const showPictures = () => (
    activities.map((activity) => <ActivityPhoto key={activity.id} activity={activity} />)
  );

  const showPhotos = () => (
    photos.map((photo) => <PhotoCard key={photo.id} photo={photo} />)
  );

  return (
        <div>
              <div className="add-baby p-4">
                <Modal title={'Add Photo'} btnStyle={'cool-button'} plus={<i className="fas fa-plus fa-xs"></i>} buttonLabel={'Add Photo'}>
                  <AddPhoto
                  baby={baby}
                  key={baby.id}
                  />
                </Modal>
              </div>
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
