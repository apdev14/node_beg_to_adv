const books = require('./books')

const createBook = (newBook) => {
  newBook.id = books.length + 1
  books.push(newBook)
  return books
}

module.exports = createBook