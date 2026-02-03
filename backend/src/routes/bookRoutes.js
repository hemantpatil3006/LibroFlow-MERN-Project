const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

const { validateBook } = require('../middleware/validationMiddleware');

router.route('/')
  .get(protect, getBooks)
  .post(protect, validateBook, createBook);

router.route('/:id')
  .get(protect, getBookById)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

module.exports = router;
