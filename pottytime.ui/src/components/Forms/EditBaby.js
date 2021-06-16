/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
import { useForm } from 'react-hook-form';
import { updateBaby } from '../../helpers/data/babyData';
import getUid from '../../helpers/data/authData';

export default function EditBaby({ baby, user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const parent = getUid();
    const file = data.imageUrl[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`${Date.now()}-${file.name}`);
    fileRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((image) => {
        const parsedId = Number(baby.id);
        const parsedParent = Number(user.id);
        const dataObject = {
          id: parsedId,
          firstName: data.firstName,
          lastName: data.lastName,
          imageUrl: image,
          birthday: data.birthday,
          userId: parsedParent,
          description: data.description,
          parentId: parent
        };
        updateBaby(parsedId, dataObject)
          .catch((err) => console.warn('nope', err));
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>First Name</h5>
      <input defaultValue={baby.firstName} {...register('firstName', { required: true })} />
      <h5>Last Name</h5>
      <input defaultValue={baby.lastName} {...register('lastName', { required: true })} />
      <h5>Image</h5>
      <input type="file" {...register('imageUrl', { required: true })} />
      <h5>Birthday</h5>
      <input type="datetime-local" id="meeting-time"
       name="meeting-time"
       max="2300-06-14T00:00" defaultValue={baby.birthday} {...register('birthday', { required: true })} />
      <h5>Description</h5>
      <input defaultValue={baby.description} {...register('description', { required: true })} />
      {errors.firstName && <span>This field is required</span>}
      {errors.lastName && <span>This field is required</span>}
      {errors.imageUrl && <span>This field is required</span>}
      {errors.birthday && <span>This field is required</span>}
      {errors.description && <span>This field is required</span>}

      <button type='submit'>Submit</button>
    </form>
  );
}

EditBaby.propTypes = {
  baby: PropTypes.any,
  user: PropTypes.any,
};
