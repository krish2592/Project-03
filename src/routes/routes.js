const express = require('express');
const router = express.Router();
const {registerUser, loginUser}=require("../controllers/userController")
const {createBook,getBookList,updateBook}=require("../controllers/bookController")
const {authenticateUser,authorization}=require("../middlewares/auth")

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/books',authenticateUser,createBook)
router.get('/books',authenticateUser,getBookList)
router.put('/books/:bookId',authenticateUser,authorization, updateBook)

module.exports=router;