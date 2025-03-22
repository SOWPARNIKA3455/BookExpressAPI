const express = require("express");
const router = express.Router();
const books = require("../book"); 




//  GET all books - http://localhost:3000/books
router.get("/", (req, res) => {
    try {
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Books not available" });
    }
});


// GET a single book by ID - http://localhost:3000/books/:id
router.get("/:id", (req, res) => {
    try {
        const bookID = parseInt(req.params.id);
        const book = books.find((book) => book.id === bookID);
        if (!book) {
            return res.status(404).json({ error: "Book not available" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//  CREATE a new book - http://localhost:3000/books
router.post("/", (req, res) => {
    try {
        const { title, author, year } = req.body;

        if (!title || !author || !year) {
            return res.status(400).json({ message: "Title, author, and year are required" });
        }

        const newBook = {
            id: books.length ? books[books.length - 1].id + 1 : 1,
            title,
            author,
            year
        };

        books.push(newBook);

        res.status(201).json({ message: "Book added", book: newBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//  UPDATE a book 
router.patch("/:id", (req, res) => {
    try {
        const bookID = parseInt(req.params.id);
        const book = books.find((book) => book.id === bookID);
        if (!book) {
            return res.status(404).json({ error: "Book not available" });
        }

        const { title, author, year } = req.body;
        if (title !== undefined) book.title = title;
        if (author !== undefined) book.author = author;
        if (year !== undefined) book.year = year;

        res.status(200).json({ message: "Book updated", book });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

//  DELETE a book 
router.delete("/:id", (req, res) => {
    try {
        const bookID = parseInt(req.params.id);
        const bookIndex = books.findIndex((book) => book.id === bookID);
        if (bookIndex === -1) {
            return res.status(404).json({ error: "Book not found" });
        }

        const deletedBook = books.splice(bookIndex, 1);
        res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router;

