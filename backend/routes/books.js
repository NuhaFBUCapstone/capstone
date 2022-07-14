const Parse = require('parse/node');
const express = require("express")
const router = express.Router()
var cors = require('cors');

router.use(cors())

const MASTERKEY = "6wssvUvxnn7VBB0mUhboQM7F7TaaBKk8sU1Ic6vE"
Parse.initialize("3PRkrcUCakVV2GzHDYS5svrNa7CK5TBD7WfiNogY", "QThaAFJyq0JMnn4yytCSPJUt9kdFqffclXAZeYBA", MASTERKEY);
// Parse.serverURL = 'http://parseapi.back4app.com/'

/**
 * add a book to a list
 */
router.post('/add/:id', async (req, res) => {
    try {
        //TODO: check if book is already in that list, no duplicates
        //could be simplified if you saved user instead of session token
        let query = new Parse.Query("_Session")
        query.equalTo("sessionToken", req.body.sessionToken)
        let objId = await query.first({useMasterKey : true})
        //get user id using session
        objId = objId.attributes.user.id
        //create books entry
        const Books = Parse.Object.extend("Books")
        let book = new Books()
        book.set("bookId", req.params.id)
        book.set("userId", objId)
        book.set("list", req.body.list)
        book.set("title", req.body.title)
        book.set("image", req.body.image)
        book.set("author", req.body.author)
        await book.save()
        res.status(200).send(book)
    } catch (err) {
        res.status(400).send({"error" : "add failed. " + err })
    }

})

/**
 * remove a book from all lists
 */
router.post('/remove/:id', async (req, res) => {
    try {
        let query = new Parse.Query("_Session")
            query.equalTo("sessionToken", req.body.sessionToken)
            let objId = await query.first({useMasterKey : true})
            //get user id using session
            objId = objId.attributes.user.id

        let book = new Parse.Query("Books")
        book.equalTo("bookId", req.params.id)
        book.equalTo("userId", objId)
        book.equalTo("list", req.body.list)
        let response = await book.first()
        console.log(response)
        if (response) {
            //if book exists:
            await response.destroy()
        }
        res.status(200).send(book)
    } catch (err) {
        res.status(400).send({"error" : "remove failed. " + err })
    }
})

module.exports = router