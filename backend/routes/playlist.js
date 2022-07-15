const express = require("express")
const router = express.Router()
var cors = require('cors');
const Playlist = require("../models/playlist")


router.use(cors())

//front end sends search term, back end does all spotify calls
router.get('/search/:term', async (req, res, next) => {
    const list = await Playlist.search(req.params.term, req.body.token)
    res.status(201).send(list)
  })





module.exports = router