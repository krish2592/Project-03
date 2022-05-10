const express = require('express');
const router = express.Router();
const {registerUser, loginUser}=require("../controllers/userController")
const {createBook,getBookList,deleteBookData}=require("../controllers/bookController")
const {authenticateUser}=require("../middlewares/auth")


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/books',authenticateUser,createBook)
router.get('/books',authenticateUser,getBookList)
router.delete('/books/:bookId',deleteBookData)



module.exports=router;