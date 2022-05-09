const jwt = require("jsonwebtoken")
const userModel =require("../models/userModel")


let authenticateUser =  function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) token = req.headers["X-Api-Key"]
        if (!token) return res.status(400).send({ status: false, msg: "Token is required" })
        try {
            decodeToken = jwt.verify(token, "Dksfoljdc45095");
        } catch (err) {
            return res.status(401).send({ status: false, msg: "Invalid token", error: err.message })
        }
        next()
    } catch (err) {
        return res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}

module.exports={authenticateUser}