const { BOOKS } = require('../models/book');

const getAllBooks = (req, res) => {
    res.json(BOOKS)
}

const getBookById = (req, res) => {
    const id = parseInt(req.params.id)  
    // console.log(req.params.id)
    // id is str so needs to be parsed 

    if(isNaN(id)) {
        return res.status(400).json({error: `The id must be a number.`})
    }

    const book = BOOKS.find(book => book.id === id)

    if (!book) {
        return res.status(404).json({err: `Book with id ${id} does not exist.`})
    }

    return res.json(book)
};

const createBook = (req, res) => {
    // add validation for missing fields
    const newBook = req.body; 
    
    // add validation for missing fields
    if (!newBook.title || !newBook.author) {
        return res.status(400).json({error: `Missing required fields: title and author.`})
    }
    newBook.id = BOOKS.length + 1
    BOOKS.push(newBook)
    // console.log(books.length)
    return res.status(201).json(BOOKS)
}

const deleteBook = (req, res) => {
    // console.log(req.params.id)
    // id is str so needs to be parsed
    const id = parseInt(req.params.id)
    console.log("id:", id)

    if(isNaN(id)) {
        return res.status(400).json({error: `The id must be a number.`})
    }

    let book = BOOKS.find(book => book.id === id)
    console.log("book:", book)

    if (!book) {
        return res.status(404).json({err: `Book with id ${id} does not exist.`})
    }

    const index = BOOKS.findIndex(book => book.id === id)
    BOOKS.splice(index, 1)


    return res.json({
        message: `Book ID:${id} deleted`,
        book: book
    })
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    deleteBook
}