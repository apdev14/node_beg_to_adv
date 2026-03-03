const booksTable = require('../models/book.model');
const db = require('../db')
const { eq } = require('drizzle-orm')

console.log("hitting controllers")
const getAllBooks = async (req, res) => {
    try {
        const books = await db.select().from(booksTable)
        res.json(books)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getBookById = async (req, res) => {
    const id = req.params.id

    const [book] = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .limit(1)

    if (!book) {
        return res.status(404).json({err: `Book with id ${id} does not exist.`})
    }

    return res.json(book)
};

const createBook = async (req, res) => {
    const { title, description,authorId } = req.body
    
    if (!title || title === "" ) {
        return res.status(400).json({error: `Title is required and cannot be empty.`})
    }

    const [result] = await db.insert(booksTable).values({
        title,
        description,
        authorId,
    }).returning({
        id: booksTable.id
    })

    return res.status(201).json({
        message: "Book created",
        id: result.id
    });
}

const deleteBook = async (req, res) => {
    const id = req.params.id

    await db.delete(booksTable).where(eq(booksTable.id, id))

    return res.json({
        message: `Book ID:${id} deleted`,
    })
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    deleteBook
}