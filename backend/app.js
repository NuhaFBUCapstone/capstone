const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Parse = require('parse/node');
const playlistRoute = require("./routes/playlist")
const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use("/playlist", playlistRoute)

const MASTERKEY = "6wssvUvxnn7VBB0mUhboQM7F7TaaBKk8sU1Ic6vE"
Parse.initialize("3PRkrcUCakVV2GzHDYS5svrNa7CK5TBD7WfiNogY", "QThaAFJyq0JMnn4yytCSPJUt9kdFqffclXAZeYBA", MASTERKEY);
Parse.serverURL = 'http://parseapi.back4app.com/'


// test:
// app.get("/", async (req, res) => {
//   res.status(200).send({ping: "pong"})
// })


//add post for messages? json arrays of books

app.post('/logout', async (req, res) => {
  try {
  let query = new Parse.Query("_Session")

  query.equalTo("sessionToken", req.body.sessionToken)

  query.first( { useMasterKey : true}).then(function (user) {
    if (user) {
      console.log(user)
      user
      .destroy(
        {useMasterKey: true}
      )
      .then ( function(res) {
        console.log("success")
        return;
      })
      .catch(function (err) {
        console.log(err)
        res.status(400)
        res.send({ Message: err.message, typeStatus: "danger"});
      })
    } else {
      console.log("Nothing here")
      res.send();
    }
  })
} catch (err) {

}
})



app.post('/login', async (req, res) => {
  try {
    const user = await Parse.User.logIn(req.body.username, req.body.password)
    res.send({"sessionToken": await user.getSessionToken()})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Login failed. " + error })
  }
})


app.post('/register', async(req, res) => {
    let user = new Parse.User(req.body);
    try {
      await user.signUp();
      res.status(201);
      // res.send({ regMessage: "User registered!", typeStatus: "success",  infoUser: infoUser });
      res.send({"sessionToken": await user.getSessionToken()})
    } catch (err) {
      res.status(400)
      res.send({ regMessage: err.message, typeStatus: "danger",  infoUser: infoUser});
    }
})

module.exports = app