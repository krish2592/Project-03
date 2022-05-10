const express = require('express');
const router = express.Router();
const {registerUser, loginUser}=require("../controllers/userController")
const {createBook,getBookList,getBookById}=require("../controllers/bookController")
const {authenticateUser}=require("../middlewares/auth")

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


module.exports=router;