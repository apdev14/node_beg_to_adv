const express = require('express');
const { getAllAuthors, getAuthorById, createAuthor, deleteAuthor, getAllBooksByAuthor } = require('../controllers/author.controller');

const router = express.Router();

router.get('/', getAllAuthors)
router.get('/:id', getAuthorById)
router.get('/:id/books', getAllBooksByAuthor)
router.post('/', createAuthor)
router.delete('/:id', deleteAuthor)

module.exports = router;