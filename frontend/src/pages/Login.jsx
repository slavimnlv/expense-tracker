import React, { useState } from 'react';
import { useCustomRequest } from '../utils/customRequest';
import { Link, useNavigate } from 'react-router-dom';
import { JWT_TOKEN_KEY } from '../utils/constants';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/LoginAndRegister';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const customRequest = useCustomRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await customRequest.post('/auth/login', formData);
      localStorage.setItem(JWT_TOKEN_KEY, data.token);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <Wrapper>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className='input-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className='input-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button type='submit'>Login</button>
        </form>
        <p>
          Not a member yet?{' '}
          <Link to='/register' className='link'>
            Register
          </Link>
        </p>
      </div>
    </Wrapper>
  );
};

export default Login;
