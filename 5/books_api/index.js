const books = require('./books')
const createBook = require('./createBook')  

const express = require("express")

const app = express()

app.use(express.json());

const PORT = 4000

app.get('/books', (req, res) => {
    res.json(books)
})

app.get('/books/:id', (req, res) => {
    // console.log(req.params.id)
    // id is str so needs to be parsed 
    const id = parseInt(req.params.id)

    if(isNaN(id)) {
        return res.status(400).json({error: `The id must be a number.`})
    }
    // console.log(id)
    const book = books.find(book => book.id === id)
    // console.log(book)  

    if (!book) {
        return res.status(404).json({err: `Book with id ${id} does not exist.`})
    }

    return res.json(book)
})

app.post('/books', (req, res) => {

    const newBook = createBook(req.body)
    return res.status(201).json(newBook)
 
    // // add validation for missing fields
    // const newBook = req.body; 
    // newBook.id = books.length + 1
    // books.push(newBook)
    // // console.log(books.length)
    // return res.status(201).json(books)
})

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id)

    if(isNaN(id)) {
        return res.status(400).json({error: `The id must be a number.`})
    }

    const book = books.find(book => book.id === id)

    if (!book) {
        return res.status(404).json({err: `Book with id ${id} does not exist.`})
    }

    // 
    books = books.filter(book => book.id !== id)
    console.log(books)
    return res.json({
        message: `Book ID:${id} deleted`,
        books
    })


})

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))