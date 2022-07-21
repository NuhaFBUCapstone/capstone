const Parse = require('parse/node');
const express = require("express")
const router = express.Router()
var cors = require('cors');

router.use(cors())

const MASTERKEY = "6wssvUvxnn7VBB0mUhboQM7F7TaaBKk8sU1Ic6vE"
Parse.initialize("3PRkrcUCakVV2GzHDYS5svrNa7CK5TBD7WfiNogY", "QThaAFJyq0JMnn4yytCSPJUt9kdFqffclXAZeYBA", MASTERKEY);

/**
 * create review and rating
 */
router.post('/add/:id', async (req, res) => {
    try {
        let query = new Parse.Query("_Session")
        query.equalTo("sessionToken", req.body.sessionToken)
        let session = await query.first({useMasterKey : true})
        //get user id using session
        let userId = session.attributes.user.id
        //get username from user query
        let userQuery = new Parse.Query("_User")
        userQuery.equalTo("objectId", session.attributes.user.id)
        let user = await userQuery.first({useMasterKey : true})
        let username = user.attributes.username
        //create Review
        const Review = Parse.Object.extend("Reviews")
        let review = new Review()
        console.log(req.body.rating)
        review.set("bookId", req.params.id)
        review.set("userId", userId)
        review.set("rating", req.body.rating)
        review.set("review", req.body.review)
        review.set("username", username)
        await review.save()
        res.status(200).send(review)
    } catch (err) {
        res.status(400).send({"error": err })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let reviewQuery = new Parse.Query("Reviews")
        reviewQuery.equalTo("bookId", req.params.id)
        const review = await reviewQuery.find({useMasterKey : true})
        res.status(200).send(review)
    } catch (err) {
        res.status(400).send({"error": err })
    }
})

module.exports = router 