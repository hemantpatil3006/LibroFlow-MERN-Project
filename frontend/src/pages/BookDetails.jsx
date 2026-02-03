import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookById, reset } from '../redux/slices/bookSlice';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { book, isLoading, isError, message } = useSelector(
    (state) => state.book
  );

  useEffect(() => {
    if (user) {
      dispatch(getBookById(id));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, id, user]);

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
      <Link to='/' className='back-link'>
        <ArrowLeft size={20} /> Back to Catalog
      </Link>

      {!user ? (
        <div className='text-center' style={{ marginTop: '5rem' }}>
          <p className='text-secondary' style={{ fontSize: '1.25rem' }}>
            Please login to view book details.
          </p>
        </div>
      ) : book && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='glass rounded-xl p-8 md:p-12'
          style={{ padding: '2rem' }}
        >
          <div className='details-grid'>
            <div className='book-cover-placeholder' style={{ height: '24rem' }}>
              <div className='text-center'>
                <p style={{ fontSize: '3.75rem', fontFamily: 'serif', color: 'rgba(255,255,255,0.2)', marginBottom: '1rem' }}>{book.title[0]}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)' }}>Book Cover</p>
              </div>
            </div>

            <div className='flex flex-col justify-center' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span className='book-genre' style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  {book.genre}
                </span>
                <h1 className='gradient-text' style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
                  {book.title}
                </h1>
                <p className='text-secondary' style={{ fontSize: '1.25rem' }}>
                  by {book.author}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', color: '#facc15' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill='currentColor' />
                  ))}
                </div>
                <span className='text-secondary'>(4.8/5.0 from 120 reviews)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white' }}>
                  ${book.price}
                </span>
                {book.inStock ? (
                  <span style={{ color: '#4ade80', fontWeight: '500', marginBottom: '0.5rem' }}>In Stock</span>
                ) : (
                  <span style={{ color: '#f87171', fontWeight: '500', marginBottom: '0.5rem' }}>Out of Stock</span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className='btn btn-primary' style={{ flex: 1 }}>
                  <ShoppingCart size={20} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BookDetails;
