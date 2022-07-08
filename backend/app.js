const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Parse = require('parse/node');

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

Parse.initialize("3PRkrcUCakVV2GzHDYS5svrNa7CK5TBD7WfiNogY", "QThaAFJyq0JMnn4yytCSPJUt9kdFqffclXAZeYBA");
Parse.serverURL = 'http://parseapi.back4app.com/'


// test:
// app.get("/", async (req, res) => {
//   res.status(200).send({ping: "pong"})
// })


//add post for messages? json arrays of books

app.post('/login', async (req, res) => {
  try {
    const user = await Parse.User.logIn(req.body.username, req.body.password)
    res.send({"user" : user})
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
      res.send({ regMessage: "User registered!", typeStatus: "success",  infoUser: infoUser });
    } catch (err) {
      res.status(400)
      res.send({ regMessage: error.message, typeStatus: "danger",  infoUser: infoUser});
    }
})

module.exports = app