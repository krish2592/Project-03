const getbooklist= async function(req,res){
    try {
        let id = req.query.userId
        let category = req.query.category
        let sub = req.query.subCategory
        let list = await booModel.find({ isDeleted: false})
        if (!list.length) { res.status(404).send({ status: false, msg: "book not found" }) }
      
        let booklist = await bookModel.find({ isDeleted: false,  $or: [{ userId: id }, { category: category },  { subCategory: sub }] },{_id:1,title:1,excerpt:1,userId:1,category:1,reviews:1,releasedAt:1}).sort({'title': 1})
        if (!booklist.length) {
            res.status(404).send({ status: false, msg: "books not found" })
        }

        else { res.status(200).send({ status: true, data: booklist }) }

    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }

}
