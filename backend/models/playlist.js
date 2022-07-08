const { BadRequestError, NotFoundError } = require("../utils/errors")

class Playlist {
    constructor() {
        this.super();
    }
    static search(term, token) {
        //same as routes
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
    }

    //from a list of playlists, choose 5 random songs
    static getSongs(playlistList) {

    }

    //from 5 songs, get recommendations
    static getRec(songArr) {

    }

}