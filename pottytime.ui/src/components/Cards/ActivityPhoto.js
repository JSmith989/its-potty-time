import React from 'react';
import PropTypes from 'prop-types';

export default function ActivityPhoto({ activity }) {
  return (
    <div>
      <div className='card photos-card'>
        <img className='photos-image card-img-top' src={activity.imageUrl} alt='Card image cap' />
        <div className='card-body'>
          <p className='card-text'>
            {activity.description}
          </p>
        </div>
      </div>
    </div>
  );
}

ActivityPhoto.propTypes = {
  activity: PropTypes.any,
};
