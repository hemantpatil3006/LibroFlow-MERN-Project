import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset as resetAuth } from '../redux/slices/authSlice';
import { reset as resetBooks } from '../redux/slices/bookSlice';
import { LogOut, BookOpen, LayoutDashboard, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetAuth());
    dispatch(resetBooks());
    navigate('/');
  };

  return (
    <nav className='glass navbar'>
      <div className='nav-content'>
        <Link to='/' className='nav-brand gradient-text'>
          <BookOpen className='text-primary' />
          <span>LibroFlow</span>
        </Link>
        
        <ul className='nav-links'>
          {user ? (
            <>
              <li>
                <Link to='/dashboard' className='nav-item'>
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <button
                  className='btn btn-secondary'
                  onClick={onLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login' className='nav-item'>
                  <User size={20} />
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to='/register' className='btn btn-primary'>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
