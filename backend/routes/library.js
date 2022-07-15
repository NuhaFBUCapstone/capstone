const Parse = require('parse/node');
const express = require("express")
const router = express.Router()
var cors = require('cors');

router.use(cors())

const MASTERKEY = "6wssvUvxnn7VBB0mUhboQM7F7TaaBKk8sU1Ic6vE"
Parse.initialize("3PRkrcUCakVV2GzHDYS5svrNa7CK5TBD7WfiNogY", "QThaAFJyq0JMnn4yytCSPJUt9kdFqffclXAZeYBA", MASTERKEY);
// Parse.serverURL = 'http://parseapi.back4app.com/'

async function getUserHelper(sessionToken) {
    // return user from session token
    let query = new Parse.Query("_Session")
    query.equalTo("sessionToken", sessionToken)
    const session = await query.first({useMasterKey : true})
    let userQuery = new Parse.Query("_User")
    userQuery.equalTo("objectId", session.attributes.user.id)
    return await userQuery.first({useMasterKey : true})
}

router.post('/add/:list', async (req, res) => {
    try {
        let user = await getUserHelper(req.body.sessionToken)
        user.add("lists", req.params.list)
        await user.save(null, { useMasterKey: true });
        console.log(user.attributes.lists)
        res.send(user)
    } catch (err) {
        res.status(400).send({"error" : "list creation failed. " + err })
    }
})

router.post('/delete/:list', async (req, res) => {
    try {
        let user = await getUserHelper(req.body.sessionToken)
        user.remove("lists", req.params.list)
        await user.save(null, { useMasterKey: true });
        console.log(user.attributes.lists)
        res.send(user)
    } catch (err) {
        res.status(400).send({"error" : "list deletion failed. " + err })
    }
})



router.get('/:sessionToken', async (req, res) => {
    try {
        let user = await getUserHelper(req.params.sessionToken)
        let temp = {}
        for (let i=0; i<user.attributes.lists.length; i++) {
            let l = user.attributes.lists[i]
            let bookQuery = new Parse.Query("Books")
            bookQuery.equalTo("userId", user.id)
            bookQuery.equalTo("list", l)
            const books = await bookQuery.find({useMasterKey : true})
            console.log(books)
            temp[l] = books
        }
        // user.attributes.lists.map(async l => {
        //     let bookQuery = new Parse.Query("Books")
        //     bookQuery.equalTo("userId", user.id)
        //     bookQuery.equalTo("list", l)
        //     const books = await bookQuery.find({useMasterKey : true})
        //     console.log(books)
        //     temp[l] = books
        // })
        res.send(temp)
        //res.send({list1:[], list2:[]...})
    } catch (err) {
        res.status(400).send({"error": `lists could not be retrieved. ${err}`})
    }
})

router.get('books/:list', async (req, res) => {
    try {
        let query = new Parse.Query("_Session")
        query.equalTo("sessionToken", sessionToken)
        const session = await query.first({useMasterKey : true})
        let bookQuery = new Parse.Query("Books")
        bookQuery.equalTo("userId", session.attributes.user.id)
        bookQuery.equalTo("list", req.params.list)
        const books = await bookQuery.find({useMasterKey : true})
        res.status(200).send(books)
    } catch (err) {
        res.status(400).send({"error": `books could not be retrieved. ${err}`})

    }
})


module.exports = router