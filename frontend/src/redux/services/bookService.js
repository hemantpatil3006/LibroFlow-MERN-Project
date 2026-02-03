import axiosInstance from '../../utils/axiosConfig';

const getBooks = async () => {
  const response = await axiosInstance.get('/books');
  return response.data.data;
};

const getBookById = async (bookId) => {
  const response = await axiosInstance.get(`/books/${bookId}`);
  return response.data.data;
};

const createBook = async (bookData) => {
  const response = await axiosInstance.post('/books', bookData);
  return response.data.data;
};

const updateBook = async (bookId, bookData) => {
  const response = await axiosInstance.put(`/books/${bookId}`, bookData);
  return response.data.data;
};

const deleteBook = async (bookId) => {
  const response = await axiosInstance.delete(`/books/${bookId}`);
  return response.data.data;
};

const bookService = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

export default bookService;
