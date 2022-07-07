const express = require("express")
const router = express.Router()
const Parse = require('parse/node');

Parse.initialize("3PRkrcUCakVV2GzHDYS5svrNa7CK5TBD7WfiNogY", "QThaAFJyq0JMnn4yytCSPJUt9kdFqffclXAZeYBA");
Parse.serverURL = 'http://localhost:3001/parse'



// Request the Log in passing the email and password
router.post('/login', async(req, res) => {
    let infoUser = req.body;
    
    try{
      let user = await Parse.User.logIn(infoUser.usernameLogin, infoUser.passwordLogin)
      res.render('index', { loginMessage: "User logged!", RegisterMessage: '', typeStatus: "success",  infoUser: infoUser });
    } catch (error){
      res.render('index', { loginMessage: error.message, RegisterMessage: '', typeStatus: "danger",  infoUser: infoUser});
    }
  });
  
  // Register the user passing the username, password and email
  router.post('/register', async(req, res) => {
    let infoUser = req.body;    
    let user = new Parse.User();
  
    user.set("username", infoUser.usernameRegister);
    user.set("password", infoUser.passwordRegister);
    user.set("email", infoUser.emailRegister);
  
    try{
      await user.signUp();
      res.render('index', { loginMessage : '', RegisterMessage: "User created!", typeStatus: "success",  infoUser: infoUser});
    } catch (error) {
      res.render('index', { loginMessage : '', RegisterMessage: error.message, typeStatus: "danger",  infoUser: infoUser});
    }
  });

  module.exports = router