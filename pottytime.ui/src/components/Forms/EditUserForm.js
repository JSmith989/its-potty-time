import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { updateUser } from '../../helpers/data/userData';

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
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      imageUrl: data.imageUrl,
      description: data.description
    };
    updateUser(userId, dataObject)
      .catch((err) => console.warn('nope', err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>First Name</h5>
      <input defaultValue={user.firstName} {...register('firstName', { required: true })} />
      <h5>Last Name</h5>
      <input defaultValue={user.lastName} {...register('lastName', { required: true })} />
      <h5>Email</h5>
      <input defaultValue={user.email} {...register('email', { required: true })} />
      <h5>Image Url</h5>
      <input defaultValue={user.imageUrl} {...register('imageUrl', { required: true })} />
      <h5>Description</h5>
      <input defaultValue={user.description} {...register('description', { required: true })} />
      {errors.firstName && <span>This field is required</span>}
      {errors.lastName && <span>This field is required</span>}
      {errors.email && <span>This field is required</span>}
      {errors.imageUrl && <span>This field is required</span>}

      <button type='submit'>Submit</button>
    </form>
  );
}

EditUserForm.propTypes = {
  user: PropTypes.any
};
