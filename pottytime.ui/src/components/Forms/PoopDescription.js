import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { updateDescription } from '../../helpers/data/activitydata';

export default function PoopDescription({ activity }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();

  const onSubmit = (data) => {
    const activityId = activity.id;
    const parsedId = Number(activity.id);
    const dataObject = {
      id: parsedId,
      description: data.description
    };
    updateDescription(activityId, dataObject)
      .catch((err) => console.warn('nope', err));
    addToast('The poop description has been updated!', {
      appearance: 'success',
      autoDismiss: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>Description</h5>
      <input defaultValue={activity.description} {...register('description', { required: true })} />
      {errors.description && <span>This field is required</span>}

      <button type='submit'>Submit</button>
    </form>
  );
}

PoopDescription.propTypes = {
  activity: PropTypes.any
};
