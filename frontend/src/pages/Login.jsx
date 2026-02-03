import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
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
            Welcome Back
          </h1>
          <p className='text-secondary mt-2'>Login to manage your collection</p>
        </div>

        <form onSubmit={onSubmit}>
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
              placeholder='Enter password'
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
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>

        <p className='text-center mt-6 text-secondary'>
          Don't have an account?{' '}
          <Link to='/register' className='text-primary' style={{ fontWeight: '500' }}>
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
