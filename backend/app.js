const express = require('express')
const app = express()
const cors = require("cors")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Parse = require('parse/node');


app.use(bodyParser.json());
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

Parse.initialize("3PRkrcUCakVV2GzHDYS5svrNa7CK5TBD7WfiNogY", "QThaAFJyq0JMnn4yytCSPJUt9kdFqffclXAZeYBA");
Parse.serverURL = 'http://parseapi.back4app.com/'

app.post('/login', async (req, res) => {
  try {
    const user = await Parse.User.logIn(req.body.username, req.body.password)
    res.send({"user" : user})
  } catch (error) {
    res.status(400)
    res.send({"error" : "Login failed: " + error })
  }
})


app.post('/users/register', async(req, res) => {
    let infoUser = req.body;
    let user = new Parse.User();

    user.set("username", infoUser.username);
    user.set("password", infoUser.password);
    user.set("email", infoUser.email);

    try{
      await user.signUp()
      res.send({ loginMessage: "User logged!", RegisterMessage: '', typeStatus: "success",  infoUser: infoUser });
    } catch (error){
      res.send({ loginMessage: error.message, RegisterMessage: '', typeStatus: "danger",  infoUser: infoUser});
    }
})

module.exports = app