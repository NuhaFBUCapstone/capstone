const express = require("express")
const router = express.Router()
var cors = require('cors');
const Playlist = require("../models/playlist")


router.use(cors())

//front end sends search term, back end does all spotify calls
router.get('/search/:term', async (req, res, next) => {
    const list = await Playlist.search(req.params.term, req.body.token)
    res.status(201).send(list)
    
    //call 3 functions in models
    // try {
    //   var options = {
    //     url: `https://api.spotify.com/v1/search?q=${req.params.term}&type=playlist`,
    //     headers: { 'Authorization': 'Bearer ' + req.body.token},
    //     json: true
    //   };
  
    //   request.get(options, function(error, response, body) {
    //     res.status(200).json({body})
    //   });
  
    // } catch(err) {
    //   next(err)
    // }
  })





module.exports = router