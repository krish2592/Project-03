const jwt = require("jsonwebtoken")
const userModel =require("../models/userModel")


let authenticateUser =  function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) token = req.headers["X-Api-Key"]
        if (!token) return res.status(400).send({ status: false, msg: "Token is required" })
        try {
            decodeToken = jwt.verify(token, "Dksfoljdc45095");
            req.userId=decodeToken.userId;

        } catch (err) {
            return res.status(401).send({ status: false, msg: "Invalid token", error: err.message })
        }
        next()
    } catch (err) {
        return res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}
const authorization = function (req, res, next) {
    try {
        

        let data =req.userId;
    
        
    
            console.log(data1)
            if(data1 !==data2){
                return res.status(401).send({ status: false, msg: 'Unauthorized "Cannot access Other"s Data' })
                }
        
        

        next()
    }

    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

module.exports={authenticateUser}