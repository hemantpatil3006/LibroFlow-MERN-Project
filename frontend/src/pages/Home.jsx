import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBooks, reset } from '../redux/slices/bookSlice';
import { motion } from 'framer-motion';
import { Book as BookIcon } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { books, isLoading, isError, message } = useSelector(
    (state) => state.book
  );

  useEffect(() => {
    if (user) {
      dispatch(getBooks());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className='flex-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-center text-red-500 mt-10'>
        Error: {message}
      </div>
    );
  }

  return (
    <div className='page container'>
      <div className='hero-section'>
        <h1 className='hero-title gradient-text'>
          LibroFlow
        </h1>
        <p className='hero-subtitle'>
          Explore our vast collection of books across all genres
        </p>
      </div>

      {!user ? (
        <div className='text-center' style={{ marginTop: '5rem' }}>
          <p className='text-secondary' style={{ fontSize: '1.25rem' }}>
            Please login to view and manage your personal book catalog.
          </p>
        </div>
      ) : books.length > 0 ? (
        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className='grid-books'
        >
          {books.map((book) => (
            <motion.div
              key={book._id}
              variants={item}
              className='card glass'
            >
              <div className='book-cover-placeholder'>
                <BookIcon size={64} className='text-primary' style={{ opacity: 0.5 }} />
              </div>
              <h3 className='font-bold mb-2 truncate' title={book.title} style={{ fontSize: '1.25rem' }}>
                {book.title}
              </h3>
              <div className='book-meta'>
                <span className='text-secondary text-sm'>{book.author}</span>
                <span className='book-genre'>
                  {book.genre}
                </span>
              </div>
              <div className='book-footer'>
                <span className='book-price'>
                  ${book.price}
                </span>
                <Link to={`/book/${book._id}`} className='btn btn-secondary'>
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className='text-center text-secondary mt-20'>
          <p style={{ fontSize: '1.25rem' }}>No books found.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
