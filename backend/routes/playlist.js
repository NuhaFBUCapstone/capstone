const express = require("express")
const router = express.Router()
var request = require('request'); // "Request" library
var cors = require('cors');

router.use(cors())

//front end sends search term, back end does all spotify calls
router.get('/search/:term', async (req, res, next) => {
    //call 3 functions in models
    try {
      var options = {
        url: `https://api.spotify.com/v1/search?q=${req.params.term}&type=playlist`,
        headers: { 'Authorization': 'Bearer ' + req.body.token},
        json: true
      };
  
      request.get(options, function(error, response, body) {
        res.status(200).json({body})
      });
  
    } catch(err) {
      next(err)
    }
  })





module.exports = router