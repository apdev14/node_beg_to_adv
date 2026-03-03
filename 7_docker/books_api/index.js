require('dotenv/config')

const express = require("express")

const bookRouter = require('./routes/book.routes')
const authorRouter = require('./routes/author.routes')

const app = express()

app.use(express.json());

const PORT = 4000

app.use('/books', bookRouter) 
app.use('/authors', authorRouter) 

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))