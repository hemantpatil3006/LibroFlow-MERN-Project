import axiosInstance from '../../utils/axiosConfig';

const register = async (userData) => {
  const response = await axiosInstance.post('/users/register', userData);
  if (response.data && response.data.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  return response.data.data;
};

const login = async (userData) => {
  const response = await axiosInstance.post('/users/login', userData);
  if (response.data && response.data.data) {
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  return response.data.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
