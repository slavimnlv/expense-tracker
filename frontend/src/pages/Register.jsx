import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCustomRequest } from '../utils/customRequest';
import {
  validateName,
  validateEmail,
  validatePassword,
} from '../utils/validations';
import Wrapper from '../assets/wrappers/LoginAndRegister';

const Register = () => {
  const navigate = useNavigate();
  const customRequest = useCustomRequest();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = [
      validateName(formData.name),
      validateEmail(formData.email),
      validatePassword(formData.password),
    ];

    const firstError = validationErrors.find((error) => error);

    if (firstError) {
      toast.error(firstError);
      return;
    }

    try {
      await customRequest.post('/auth/register', formData);
      toast.success('Registration successful');
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Wrapper>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>

          <div className='input-group'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className='input-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='input-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type='submit'>Register</button>
        </form>
        <p>
          Already a member?{' '}
          <Link to='/login' className='link'>
            Login
          </Link>
        </p>
      </div>
    </Wrapper>
  );
};

export default Register;
