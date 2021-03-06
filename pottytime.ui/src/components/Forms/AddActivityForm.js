/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { addActivity } from '../../helpers/data/activitydata';
import getUid from '../../helpers/data/authData';
import { getBabies } from '../../helpers/data/babyData';

export default function EditUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();
  const [babies, setBabies] = useState([]);

  const getAllBabies = (userId) => {
    getBabies(userId).then((response) => {
      setBabies(response);
    })
      .catch((err) => console.warn('no babies', err));
  };

  const onSubmit = (data) => {
    const file = data.imageUrl[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`${Date.now()}-${file.name}`);
    fileRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((image) => {
        const parsedActivity = Number(data.activityType);
        const parsedRating = Number(data.rating);
        const parsedMeal = Number(data.mealType);
        const parsedChild = Number(data.childId);
        const boolConvert = () => {
          if (data.isAllergy === 'true') {
            return true;
          }
          return false;
        };
        const dataObject = {
          activityType: parsedActivity,
          date: data.date,
          rating: parsedRating,
          imageUrl: image,
          description: data.description,
          isAllergy: boolConvert(),
          mealType: parsedMeal,
          childId: parsedChild
        };
        addActivity(dataObject).then((response) => {
          if (response) {
            addToast('The activity has been added to the calendar!', {
              appearance: 'success',
              autoDismiss: true,
            });
          }
        })
          .catch((err) => {
            console.warn('nope', err);
            addToast('The activity has not been added', {
              appearance: 'error',
              autoDismiss: true,
            });
          });
      });
    });
  };

  useEffect(() => {
    const userId = getUid();
    if (userId) {
      getAllBabies(userId);
    }
  }, [babies]);

  const babyOptions = () => (
    babies.map((baby) => <option key={baby.id} value={baby.id}>{baby.firstName} {baby.lastName}</option>)
  );

  return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Which child?</h5>
        <select {...register('childId', { required: true })}>
        <option>Select a baby</option>
        {babyOptions()}
      </select>
      <h5>Activity</h5>
        <select {...register('activityType', { required: true })}>
        <option value={0}>Poop</option>
        <option value={1}>Breakfast</option>
        <option value={2}>Lunch</option>
        <option value={3}>Dinner</option>
      </select>
      <h5>Date</h5>
      <input type="datetime-local" id="meeting-time"
       name="meeting-time"
       max="2300-06-14T00:00" {...register('date', { required: true })} />
      <h5>Rating</h5>
        <select {...register('rating', { required: true })}>
        <option value={0}>0 out of 5</option>
        <option value={1}>1 out of 5</option>
        <option value={2}>2 out of 5</option>
        <option value={3}>3 out of 5</option>
        <option value={4}>4 out of 5</option>
        <option value={5}>5 out of 5</option>
      </select>
      <h5>Image</h5>
      <input type="file" {...register('imageUrl', { required: true })} />
      <h5>Description</h5>
      <input {...register('description', { required: true })} />
      <h5>Are they allergic?</h5>
        <select {...register('isAllergy', { required: true })}>
        <option value={false}>No</option>
        <option value={true}>Yes</option>
        <option value={false}>N/A </option>
      </select>
      <h5>Food Type</h5>
        <select {...register('mealType', { required: true })}>
        <option value={3}>None</option>
        <option value={0}>Vegetable</option>
        <option value={1}>Fruit</option>
        <option value={2}>Meat</option>
      </select>
      {errors.childId && <span>Child is required</span>}
      {errors.activityType && <span>Activity type is required</span>}
      {errors.date && <span>Date is required</span>}
      {errors.rating && <span>Rating is required</span>}
      {errors.imageUrl && <span>Image is required</span>}
      {errors.description && <span>Description is required</span>}
      {errors.isAllergy && <span>Allergy is required</span>}
      {errors.mealType && <span>Meal type is required</span>}

      <button type='submit'>Submit</button>
      </form>

  );
}

EditUserForm.propTypes = {
  user: PropTypes.any
};
