const Book = require('../models/Book');

const getBooks = async (filter = {}) => {
  return await Book.find(filter);
};

const getBookById = async (id) => {
  return await Book.findById(id);
};

const createBook = async (bookData) => {
  return await Book.create(bookData);
};

const updateBook = async (id, updateData) => {
  const book = await Book.findById(id);
  if (book) {
    book.title = updateData.title || book.title;
    book.author = updateData.author || book.author;
    book.genre = updateData.genre || book.genre;
    book.price = updateData.price || book.price;
    book.inStock = updateData.inStock !== undefined ? updateData.inStock : book.inStock;
    return await book.save();
  }
  return null;
};

const deleteBook = async (id) => {
  const book = await Book.findById(id);
  if (book) {
    await book.deleteOne();
    return true;
  }
  return false;
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
