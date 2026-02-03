import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <div className='page flex-center'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className='card glass'
        style={{ width: '100%', maxWidth: '28rem' }}
      >
        <div className='text-center mb-8'>
          <h1 className='hero-title gradient-text' style={{ fontSize: '1.875rem' }}>
            Create Account
          </h1>
          <p className='text-secondary mt-2'>Start your book journey today</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className='input-group'>
            <label className='label'>Name</label>
            <input
              type='text'
              className='input'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
          </div>

          <div className='input-group'>
            <label className='label'>Email Address</label>
            <input
              type='email'
              className='input'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>

          <div className='input-group'>
            <label className='label'>Password</label>
            <input
              type='password'
              className='input'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Create password'
              required
            />
          </div>

          <div className='input-group'>
            <label className='label'>Confirm Password</label>
            <input
              type='password'
              className='input'
              name='confirmPassword'
              value={confirmPassword}
              onChange={onChange}
              placeholder='Confirm password'
              required
            />
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button
              type='submit'
              className='btn btn-primary'
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </div>
        </form>

        <p className='text-center mt-6 text-secondary'>
          Already have an account?{' '}
          <Link to='/login' className='text-primary' style={{ fontWeight: '500' }}>
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
