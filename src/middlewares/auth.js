const jwt = require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")
const bookModel = require("../models/bookModel")


let authenticateUser = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) token = req.headers["X-Api-Key"]
        if (!token) return res.status(400).send({ status: false, message: "Token is required" })

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (!decoded) {
                return res.status(401).send({ status: false, message: "Invalid token", err: err.message })
            } else {
                req.userId = decoded.userId;
                next();
            }
        });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

//**********************************************************************//

const authorization = async function (req, res, next) {
    try {
        let tokenId = req.userId;
        let bookId = req.params.bookId || req.query.bookId;

        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: `Book id ${bookId} is invalid` })

        const findUser = await bookModel.findOne({ _id: bookId });
        if (!findUser) return res.status(404).send({ status: false, message: 'User not found' })
        const { userId } = findUser;

        if (tokenId.toString() !== userId.toString()) return res.status(403).send({ status: false, message: "Unauthorized, cannot access other's data." })
        next()
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

//**********************************************************************//

module.exports = { authenticateUser, authorization }

//**********************************************************************//