import React from 'react';
import PropTypes from 'prop-types';
import { useToasts } from 'react-toast-notifications';
import { useForm } from 'react-hook-form';
import { updateDescription } from '../../helpers/data/userData';

export default function AddDescription({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addToast } = useToasts();

  const onSubmit = (data) => {
    const userId = user.id;
    const parsedId = Number(user.id);
    const dataObject = {
      id: parsedId,
      description: data.description
    };
    updateDescription(userId, dataObject).then((response) => {
      if (response) {
        addToast('The description has been updated!', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    })
      .catch((err) => {
        console.warn('nope', err);
        addToast('The description has not been added', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>Description</h5>
      <input defaultValue={user.description} {...register('description', { required: true })} />
      {errors.description && <span>This field is required</span>}

      <button type='submit'>Submit</button>
    </form>
  );
}

AddDescription.propTypes = {
  user: PropTypes.any
};
