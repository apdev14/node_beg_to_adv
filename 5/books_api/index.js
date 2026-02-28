const express = require("express")

const bookRouter = require('./routes/book.routes')

const app = express()

app.use(express.json());

const PORT = 4000

app.use('/books', bookRouter) 

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))