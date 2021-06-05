/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
import { useForm } from 'react-hook-form';
import { addBaby } from '../../helpers/data/babyData';
import getUid from '../../helpers/data/authData';

export default function MakeABaby({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const parent = getUid();
    const file = data.imageUrl[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((image) => {
        const parsedId = Number(user.id);
        const parsedAge = Number(data.age);
        const dataObject = {
          firstName: data.firstName,
          lastName: data.lastName,
          imageUrl: image,
          birthday: data.birthday,
          userId: parsedId,
          age: parsedAge,
          description: data.description,
          parentId: parent
        };
        console.log(dataObject);
        addBaby(dataObject)
          .catch((err) => console.warn('nope', err));
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>First Name</h5>
      <input {...register('firstName', { required: true })} />
      <h5>Last Name</h5>
      <input {...register('lastName', { required: true })} />
      <h5>Image</h5>
      <input type="file" {...register('imageUrl', { required: true })} />
      <h5>Birthday</h5>
      <input type="datetime-local" id="meeting-time"
       name="meeting-time"
       max="2300-06-14T00:00" {...register('birthday', { required: true })} />
      <h5>Age</h5>
      <input {...register('age', { required: true })} />
      <h5>Description</h5>
      <input {...register('description', { required: true })} />
      {errors.firstName && <span>This field is required</span>}
      {errors.lastName && <span>This field is required</span>}
      {errors.imageUrl && <span>This field is required</span>}
      {errors.birthday && <span>This field is required</span>}
      {errors.age && <span>This field is required</span>}
      {errors.description && <span>This field is required</span>}

      <button type='submit'>Submit</button>
    </form>
  );
}

MakeABaby.propTypes = {
  user: PropTypes.any
};
