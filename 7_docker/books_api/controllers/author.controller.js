const authorsTable = require('../models/author.model');
const booksTable = require('../models/book.model');
const db = require('../db')
const { eq, ilike, sql } = require('drizzle-orm')

const getAllAuthors = async (req, res) => {
    try {
        const authors = await db.select().from(authorsTable)
        res.json(authors)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAuthorById = async (req, res) => {
    const id = req.params.id

    const [author] = await db
    .select()
    .from(authorsTable)
    .where((table) => eq(table.id, id))

    if (!author) {
        return res.status(404).json({err: `Author with id ${id} does not exist.`})
    }

    return res.json(author)
};

const createAuthor = async (req, res) => {
    const { firstName, lastName, email } = req.body
    
    if (!firstName || firstName === "" ) {
        return res.status(400).json({error: `First name is required and cannot be empty.`})
    }

    const [result] = await db.insert(authorsTable).values({
        firstName,
        lastName,
        email,
    }).returning({
        id: authorsTable.id
    })

    return res.status(201).json({
        message: "Author created",
        id: result.id
    });
}

const deleteAuthor = async (req, res) => {
    const id = req.params.id

    await db.delete(authorsTable).where(eq(authorsTable.id, id))

    return res.json({
        message: `Author ID:${id} deleted`,
    })
}

const getAllBooksByAuthor = async (req, res) => {
    const authorId = req.params.id

    const books = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.authorId, authorId))
    //? seems to work the same way... 
    // .where(eq(booksTable.authorId, authorId))

    if (!books) {
        return res.status(404).json({err: `No books for author with id ${id}.`})
    }

    return res.json(books)


}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    deleteAuthor,
    getAllBooksByAuthor
}