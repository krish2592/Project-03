const express = require('express');
const router = express.Router();
const {registerUser, loginUser}=require("../controllers/userController")
const {createBook,getBookList,getBookById,updateBook,deleteBookData}=require("../controllers/bookController")
const {createReview,deleteReview}=require("../controllers/reviewController")
const {authenticateUser,authorization}=require("../middlewares/auth")


//==Register User
router.post('/register', registerUser)

//==Login User
router.post('/login', loginUser)

//==Create Book Document
router.post('/books',authenticateUser,createBook)

//==Get Book List(with/without query params)
router.get('/books',authenticateUser,getBookList)

//==Get Book by BookId
router.get('/books/:bookId',authenticateUser,getBookById)

//==Update Book by BookId
router.put('/books/:bookId',authenticateUser,authorization, updateBook)

//==Delete Book by BookId
router.delete('/books/:bookId',authenticateUser,authorization,deleteBookData)

//==Create Review for BookId
router.post('/books/:bookId/review',authenticateUser,createReview)

//==Delete Review for BookId
router.delete('/books/:bookId/review/:reviewId',authenticateUser,deleteReview)

module.exports=router;