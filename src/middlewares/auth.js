const jwt = require("jsonwebtoken")
const bookModel = require("../models/bookModel")


let authenticateUser = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) token = req.headers["X-Api-Key"]
        if (!token) return res.status(400).send({ status: false, msg: "Token is required" })

        try {
            decodeToken = jwt.verify(token, "Dksfoljdc45095");
            req.userId = decodeToken.userId;


        } catch (err) {
            return res.status(401).send({ status: false, msg: "Invalid token", error: err.message })
        }
        next()
    } catch (err) {
        return res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}
const authorization = async function (req, res, next) {
    try {

        let tokenId = req.userId;
        let bookId = req.params.bookId || req.query.bookId;
        if (!bookId) return res.status(400).send({status:false,message:"Book id is required"})

        const findUser= await bookModel.findOne({_id:bookId});
        if (!findUser) return res.status(404).send({ status: false, msg: 'User not found' })

        const {userId} = findUser;

        if(tokenId.toString()!==userId.toString()) return res.status(401).send({ status: false, msg: "Unauthorized, cannot access other's data." })

        next()
    }

    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

module.exports = { authenticateUser,authorization }