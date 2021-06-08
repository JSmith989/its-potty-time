/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/storage';
import { useForm } from 'react-hook-form';
import { updateActivity } from '../../helpers/data/activitydata';

export default function EditActivityForm({ activity, baby }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const file = data.imageUrl[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`${Date.now()}-${file.name}`);
    fileRef.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((image) => {
        const parsedActivity = Number(data.activityType);
        const parsedRating = Number(data.rating);
        const parsedMeal = Number(data.mealType);
        const parsedChild = Number(baby.id);
        const parsedId = Number(activity.id);
        const boolConvert = () => {
          if (data.isAllergy === 'true') {
            return true;
          }
          return false;
        };
        const dataObject = {
          id: parsedId,
          activityType: parsedActivity,
          date: data.date,
          rating: parsedRating,
          imageUrl: image,
          description: data.description,
          isAllergy: boolConvert(),
          mealType: parsedMeal,
          childId: parsedChild
        };
        updateActivity(parsedId, dataObject)
          .catch((err) => console.warn('nope', err));
      });
    });
  };

  const activityConvert = () => {
    if (activity.activityType === 0) {
      return 'Poop';
    } if (activity.activityType === 1) {
      return 'Breakfast';
    } if (activity.activityType === 2) {
      return 'Lunch';
    } if (activity.activityType === 3) {
      return 'Dinner';
    }
    return 'ERROR';
  };

  const ratingConvert = () => {
    if (activity.rating === 0) {
      return '0 out of 5';
    } if (activity.rating === 1) {
      return '1 out of 5';
    } if (activity.rating === 2) {
      return '2 out of 5';
    } if (activity.rating === 3) {
      return '3 out of 5';
    } if (activity.rating === 4) {
      return '4 out of 5';
    } if (activity.rating === 5) {
      return '5 out of 5';
    }
    return 'ERROR';
  };

  const allergyConvert = () => {
    if (activity.isAllergy) {
      return 'Yes';
    }
    return 'No';
  };

  const mealConvert = () => {
    if (activity.mealType === 0) {
      return 'Vegetable';
    } if (activity.mealType === 1) {
      return 'Fruit';
    } if (activity.mealType === 2) {
      return 'Meat';
    } if (activity.mealType === 3) {
      return 'None';
    }
    return 'ERROR';
  };

  return (
        <form onSubmit={handleSubmit(onSubmit)}>
      <h5>Activity</h5>
        <select {...register('activityType', { required: true })}>
        <option value={activity.activityType}>{activityConvert()}</option>
        <option value={0}>Poop</option>
        <option value={1}>Breakfast</option>
        <option value={2}>Lunch</option>
        <option value={3}>Dinner</option>
      </select>
      <h5>Date</h5>
      <input type="datetime-local" id="meeting-time"
       name="meeting-time"
       max="2300-06-14T00:00" defaultValue={activity.date} {...register('date', { required: true })} />
      <h5>Rating</h5>
        <select {...register('rating', { required: true })}>
        <option value={activity.rating}>{ratingConvert()}</option>
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
      <input defaultValue={activity.description} {...register('description', { required: true })} />
      <h5>Are they allergic?</h5>
        <select {...register('isAllergy', { required: true })}>
        <option value={activity.isAllergy}>{allergyConvert()}</option>
        <option value={false}>No</option>
        <option value={true}>Yes</option>
        <option value={false}>N/A </option>
      </select>
      <h5>Food Type</h5>
        <select {...register('mealType', { required: true })}>
        <option value={activity.mealType}>{mealConvert()}</option>
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

EditActivityForm.propTypes = {
  user: PropTypes.any,
  baby: PropTypes.any,
  activity: PropTypes.any,
};
