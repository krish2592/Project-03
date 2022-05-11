

//const mongoose = require("mongoose")
//const ObjectId = mongoose.Schema.Types.ObjectId;
//const { create } = require("../models/bookModel");
const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel");
const { isValidRequestBody, isValid,isValidObjectId } = require("../utilities/validator");

//---CREATE REVIEW FOR BOOKID
    const createReview = async function (req, res) {
     try {
    //==validating bookId(params)==//
        if (!isValidObjectId(req.params.bookId)) { return res.status(400).send({ status: false, message: "Please provide valid Book Id in param." }) }

    //==validating request body==//   
        let data = req.body;
        data["reviewedAt"]=new Date();
        if (!isValidRequestBody(data)) { return res.status(400).send({ status: false, message: "Enter data to create a review" }) }

    //==validating bookId(request body)==//
        if (!isValid(data.bookId)) { return res.status(400).send({ status: false, message: "BookId is required" }) }
        if (!isValidObjectId(data.bookId)) { return res.status(400).send({ status: false, message: "Please provide valid Book Id." }) }

    //==validating rating==//
        if (!isValid(data.rating)) { return res.status(400).send({ status: false, message: "Rating is required" }) }
        if (!(data.rating >= 1 && data.rating <= 5)) { return res.status(400).send({ status: false, message: "Rating value should be between 1 to 5" }) }

    //==finding book document & creating review==//
        if ((data.bookId !== req.params.bookId)) { return res.status(400).send({ status: false, message: "Book Id does not match." }) }
        let book = await bookModel.findOne({ _id: data.bookId, isDeleted: false })
        if (!book) { return res.status(400).send({ status: false, message: "No book exist with this id" }) }    
        let createData = await reviewModel.create(data);

    //==updating review in book document==//    
        let reviewCount=book.reviews
        reviewCount ++;
        const updateReview = await bookModel.findOneAndUpdate({_id:data.bookId,isDeleted:false},{reviews:reviewCount },{new:true})

    //==destructuring to get required keys only==// 
        const { title,excerpt ,userId,category,reviews,subcategory,deletedAt,isDeleted, releasedAt,createdAt,updatedAt}=updateReview
        let  details = {  title,excerpt ,userId,category,reviews,subcategory,deletedAt,isDeleted, releasedAt,createdAt,updatedAt}

    //==finding and sending all reviews for book==// 
        let getReview= await reviewModel.find({bookId:data.bookId,isDeleted: false}).select({_id:1,bookId:1,reviewedBy:1,reviewedAt:1,rating:1,review:1})
        details["reviewData"]=getReview
        return res.status(201).send({status:true, message:"Book list",data:details})
    }catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports={createReview}