import React from 'react';
import PropTypes from 'prop-types';

export default function PhotoCard({ photo }) {
  return (
    <div>
      <div className='card photos-card'>
        <img className='photos-image card-img-top' src={photo.imageUrl} alt='Card image cap' />
      </div>
    </div>
  );
}

PhotoCard.propTypes = {
  photo: PropTypes.any,
};
