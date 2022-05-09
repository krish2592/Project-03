const userModel = require("../models/userModel");
const { isValidRequestBody, isValid, isValidEnum, isValidName, isValidMobile, isValidEmail, isValidPassword } = require("../utilities/validator");
const jwt = require("jsonwebtoken")

//--Register User
const registerUser = async function (req, res) {
    try {
        let requestBody = req.body

        if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, msg: "Invalid request, please provide details" })

        let { title, name, phone, email, password, address: { street, city, pincode } } = requestBody

        if (!isValid(title)) return res.status(400).send({ status: false, msg: "Title is a mendatory field" })
        if (!isValidEnum(title)) return res.status(400).send({ status: false, msg: "Title must contain Mr, Mrs, Miss" })

        if (!isValid(name)) return res.status(400).send({ status: false, msg: "Name is a mendatory field" })
        if (!isValidName(name)) return res.status(400).send({ status: false, msg: "Name must contain only alphabates" })

        if (!isValid(phone)) return res.status(400).send({ status: false, msg: "Phone number is a mendatory field" })
        if (!isValidMobile(phone)) return res.status(400).send({ status: false, msg: `${phone} number is not a valid` })
        let isUniquePhone = await userModel.findOne({ phone: phone })
        if (isUniquePhone) return res.status(400).send({ status: false, msg: `${phone} number is already exist` })

        if (!isValid(email)) return res.status(400).send({ status: false, msg: "email is a mendatory field" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: `${email} is not valid` })
        let isUniqueEmail = await userModel.findOne({ email: email })
        if (isUniqueEmail) return res.status(400).send({ status: false, msg: `${email} is already exist` })

        if (!isValid(password)) return res.status(400).send({ status: false, msg: "Password is a mendatory field" })
        if (!isValidPassword(password)) return res.status(400).send({ status: false, msg: `Password ${password}  must include atleast one special character[@$!%?&], one uppercase, one lowercase, one number and should be mimimum 8 to 15 characters long` })

        const userData = { title, name, phone, email, password, address: { street, city, pincode } };
        const saveUser = await userModel.create(userData)

        return res.status(201).send({ status: true, message: "Sucess", data: saveUser })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


//---User LOGIN
const loginUser = async function (req, res) {

    try {
        let requestBody = req.body;
        if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, msg: "Invalid request, please provide details" })

        const { email, password } = requestBody

        if (!isValid(email)) return res.status(400).send({ status: false, msg: "email is a mendatory field" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: `${email} is not valid` })
        let isUserEmailExist = await userModel.findOne({ email: email });
        if (!isUserEmailExist) return res.status(404).send({ status: false, msg: "Email not found" })
       
        if (!isValid(password)) return res.status(400).send({ status: false, msg: "Password is a mendatory field" })
        if (!isValidPassword(password)) return res.status(400).send({ status: false, msg: `Password ${password}  must include atleast one special character[@$!%?&], one uppercase, one lowercase, one number and should be mimimum 8 to 15 characters long` })
        let isUserPasswordExist = await userModel.findOne({ password: password });
        if (!isUserPasswordExist) return res.status(401).send({ status: false, msg: "Password is inccorrect" })

        const { _id } = isUserPasswordExist;

        let token = jwt.sign(
            {
                userId: _id.toString(),
                batch: "uranium",
                organisation: "FunctionUp"
            },
            "Dksfoljdc45095",
            { expiresIn: "1d" }
        );
        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, message: "Success", data: { token: token } });
    }
    catch (err) {
        res.status(500).send({ Error: "Server not responding", error: err.message });
    }
};


module.exports = { registerUser, loginUser }