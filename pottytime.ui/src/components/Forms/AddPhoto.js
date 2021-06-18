/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';
import firebase from 'firebase/app';
import 'firebase/storage';
import { useForm } from 'react-hook-form';
import { addPhoto } from '../../helpers/data/picturesData';

export default function AddDescription({ baby }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();

  const onSubmit = (data) => {
    const file = data.imageUrl[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`${Date.now()}-${file.name}`);
    fileRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((image) => {
        const parsedChild = Number(baby.id);
        const dataObject = {
          imageUrl: image,
          childId: parsedChild
        };
        addPhoto(dataObject)
          .catch((err) => console.warn('nope', err));
        addToast('The photo has been added!', {
          appearance: 'success',
          autoDismiss: true,
        });
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>{baby.firstName}&apos;s Photo</h5>
      <input type="file" {...register('imageUrl', { required: true })} />
      {errors.imageUrl && <span>This field is required</span>}

      <button type='submit'>Submit</button>
    </form>
  );
}

AddDescription.propTypes = {
  baby: PropTypes.any
};
