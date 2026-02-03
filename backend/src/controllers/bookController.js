const bookService = require('../services/bookService');
const { success } = require('../utils/responseHandler');

// @desc    Get all books
// @route   GET /api/books
// @access  Private
const getBooks = async (req, res, next) => {
  try {
    const books = await bookService.getBooks({ user: req.user.id });
    success(res, books, 'Books fetched successfully');
  } catch (err) {
    next(err);
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Private
const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (book && book.user.toString() === req.user.id) {
      success(res, book, 'Book fetched successfully');
    } else if (book) {
      res.status(401);
      throw new Error('User not authorized');
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private
const createBook = async (req, res, next) => {
  try {
    const bookData = { ...req.body, user: req.user.id };
    const book = await bookService.createBook(bookData);
    success(res, book, 'Book created successfully', 201);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the book user
    if (book.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    success(res, updatedBook, 'Book updated successfully');
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the book user
    if (book.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await bookService.deleteBook(req.params.id);
    success(res, null, 'Book removed successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
