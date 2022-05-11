const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const { create } = require("../models/bookModel");
const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel");
const { isValidRequestBody, isValid, isValidDate, isValidObjectId } = require("../utilities/validator");

const createReview = async function (req, res) {
    try {
        if (!isValidObjectId(req.params.bookId)) { return res.status(400).send({ status: false, message: "You should have put correct book Id in params" }) }
        req.body["reviewedAt"] = new Date();
        let data = req.body;
        if (!isValidRequestBody(data)) { return res.status(400).send({ status: false, message: "Enter data to create a review" }) }

        if (!isValid(data.bookId)) { return res.status(400).send({ status: false, message: "BookId is required" }) }
        if (!isValidObjectId(data.bookId)) { return res.status(400).send({ status: false, message: "You should have put correct book Id in body" }) }

        if (!isValid(data.rating)) { return res.status(400).send({ status: false, message: "Rating is required" }) }
        if (!(data.rating >= 1 && data.rating <= 5)) { return res.status(400).send({ status: false, message: "Rating value should be between 1 to 5" }) }
        if ((data.bookId !== req.params.bookId)) { return res.status(400).send({ status: false, message: "Id inside body and Id inside params should be same" }) }

        let book = await bookModel.findOne({ _id: data.bookId, isDeleted: false })
        if (!book) { return res.status(400).send({ status: false, messag: "No book exist with this id" }) }


        let createData = await reviewModel.create(data);

        let bookData = await bookModel.findOne({ _id: createData.bookId, isDeleted: false })
        let reviewCount = bookData.reviews
        reviewCount++;
        const updateReview = await bookModel.findOneAndUpdate({ _id: data.bookId, isDeleted: false }, { reviews: reviewCount }, { new: true })


        let getReview = await reviewModel.find({ bookId: data.bookId,isDeleted:false }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })


        return res.status(201).send({ status: true, message: "Book list", data: { updateReview, "reviewData": getReview } })

    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}
const deleteReview = async function (req, res) {
    try {
        let reviewId = req.params.reviewId;
        let bookId = req.params.bookId
        if (!isValidObjectId(reviewId)) return res.status(400).send({ status: false, message: "review Id is not a valid Id" })
        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "Book id is not a valid" })
        //const deleteReview = await reviewModel.findOne({ _id: reviewId,bookId:bookId,isDeleted: false })
        const deleteBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!deleteBook){
           const updateReview =await reviewModel.findOneAndUpdate({_id:reviewId,isDeleted:false},{isDeleted:true},{new:true})
        }
        const updateReview= await reviewModel.findOneAndUpdate({_id:reviewId,bookId:bookId,isDeleted:false},{isDeleted:true},{new:true})
        if (!updateReview) return res.status(404).send({ status: false, message: "review  data not found" })
        
       const deleteReviewCount = await bookModel.findOneAndUpdate({_id:bookId},{$inc:{reviews:-1}},{new:true})

       return res.status(200).send({ status: true, message: "deleted successfully",data:deleteReviewCount })  

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}
module.exports = { createReview, deleteReview }