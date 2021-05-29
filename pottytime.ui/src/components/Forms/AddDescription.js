import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { updateDescription } from '../../helpers/data/userData';

export default function EditUserForm({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userId = user.id;
    const parsedId = Number(user.id);
    const dataObject = {
      id: parsedId,
      description: data.description
    };
    updateDescription(userId, dataObject)
      .catch((err) => console.warn('nope', err));
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

EditUserForm.propTypes = {
  user: PropTypes.any
};
