import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  createBook, 
  getBooks, 
  deleteBook, 
  updateBook, 
  reset 
} from '../redux/slices/bookSlice';
import { toast } from 'react-toastify';
import { Trash2, Edit2, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { books, isLoading, isError, message } = useSelector(
    (state) => state.book
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
  });

  const { title, author, genre, price } = formData;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user) {
      dispatch(getBooks());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      genre,
      price: Number(price),
    };

    if (currentBookId) {
      dispatch(updateBook({ id: currentBookId, bookData }))
        .unwrap()
        .then(() => {
          toast.success('Book updated successfully');
          closeModal();
        })
        .catch(toast.error);
    } else {
      dispatch(createBook(bookData))
        .unwrap()
        .then(() => {
          toast.success('Book created successfully');
          closeModal();
        })
        .catch(toast.error);
    }
  };

  const onDelete = (book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (bookToDelete) {
      dispatch(deleteBook(bookToDelete._id));
      toast.success('Book deleted');
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setBookToDelete(null);
  };

  const openModal = (book = null) => {
    if (book) {
      setCurrentBookId(book._id);
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: book.price,
      });
    } else {
      setCurrentBookId(null);
      setFormData({
        title: '',
        author: '',
        genre: '',
        price: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBookId(null);
  };

  return (
    <div className='page container'>
      <div className='dashboard-header'>
        <h1 className='font-bold' style={{ fontSize: '1.875rem' }}>Dashboard</h1>
        <button className='btn btn-primary' onClick={() => openModal()}>
          <Plus size={20} /> Add New Book
        </button>
      </div>

      <div className='table-container glass'>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th className='book-genre-cell'>Genre</th>
              <th>Price</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book._id}>
                  <td className='font-bold'>{book.title}</td>
                  <td className='text-secondary'>{book.author}</td>
                  <td className='book-genre-cell'>
                    <span className='book-genre' style={{ fontSize: '0.75rem' }}>
                      {book.genre}
                    </span>
                  </td>
                  <td>${book.price}</td>
                  <td className='text-right'>
                    <button
                      onClick={() => openModal(book)}
                      className='text-primary'
                      style={{ marginRight: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(book)}
                      style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5' className='text-center text-secondary' style={{ padding: '2rem' }}>
                  No books found. Add one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className='modal-overlay'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='modal-content'
            >
              <div className='modal-header'>
                <h2 className='font-bold' style={{ fontSize: '1.25rem' }}>
                  {currentBookId ? 'Edit Book' : 'Add New Book'}
                </h2>
                <button
                  onClick={closeModal}
                  style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={onSubmit} className='modal-body'>
                <div className='input-group'>
                  <label className='label'>Title</label>
                  <input
                    type='text'
                    className='input'
                    name='title'
                    value={title}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className='input-group'>
                  <label className='label'>Author</label>
                  <input
                    type='text'
                    className='input'
                    name='author'
                    value={author}
                    onChange={onChange}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className='input-group'>
                    <label className='label'>Genre</label>
                    <input
                      type='text'
                      className='input'
                      name='genre'
                      value={genre}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className='input-group'>
                    <label className='label'>Price</label>
                    <input
                      type='number'
                      className='input'
                      name='price'
                      value={price}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className='modal-footer'>
                  <button
                    type='button'
                    onClick={closeModal}
                    className='btn btn-secondary'
                  >
                    Cancel
                  </button>
                  <button type='submit' className='btn btn-primary'>
                    {currentBookId ? 'Update Book' : 'Add Book'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className='modal-overlay'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='modal-content'
              style={{ maxWidth: '24rem' }}
            >
              <div className='modal-header'>
                <h2 className='font-bold' style={{ fontSize: '1.25rem' }}>Confirm Delete</h2>
                <button
                  onClick={closeDeleteModal}
                  style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>
              <div className='modal-body'>
                <p className='text-secondary'>
                  Are you sure you want to delete <strong style={{ color: 'white' }}>"{bookToDelete?.title}"</strong>? This action cannot be undone.
                </p>
                <div className='modal-footer'>
                  <button
                    onClick={closeDeleteModal}
                    className='btn btn-secondary'
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete} 
                    className='btn' 
                    style={{ background: '#ef4444', border: 'none' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
