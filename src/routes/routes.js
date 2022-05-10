const express = require('express');
const router = express.Router();
const {registerUser, loginUser} =require("../controllers/userController")
const {createBook } =require("../controllers/bookController")
const {authenticateUser } =require("../middlewares/auth")


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/books',authenticateUser,createBook)


module.exports=router;