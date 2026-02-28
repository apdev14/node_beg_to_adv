const express = require('express');
const { BOOKS } = require('../db/book');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(BOOKS)
})

router.get('/:id', (req, res) => {
    // console.log(req.params.id)
    // id is str so needs to be parsed 
    const id = parseInt(req.params.id)

    if(isNaN(id)) {
        return res.status(400).json({error: `The id must be a number.`})
    }
    // console.log(id)
    const book = BOOKS.find(book => book.id === id)
    // console.log(book)  

    if (!book) {
        return res.status(404).json({err: `Book with id ${id} does not exist.`})
    }

    return res.json(book)
})

router.post('/', (req, res) => {
    // add validation for missing fields
    const newBook = req.body; 
    newBook.id = BOOKS.length + 1
    BOOKS.push(newBook)
    // console.log(books.length)
    return res.status(201).json(BOOKS)
})

// TypeError: Assignment to constant variable
router.delete('/:id', (req, res) => {
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

    // 
    BOOKS = BOOKS.filter(book => book.id !== id)
    console.log(BOOKS)
    return res.json({
        message: `Book ID:${id} deleted`,
        books: BOOKS
    })
})

module.exports = router;