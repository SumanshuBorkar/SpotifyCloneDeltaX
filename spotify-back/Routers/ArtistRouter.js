const express = require("express");
const Router = express.Router();
const { createNewArtist, getTopArtists, searchArtistsByName } = require("./../Controllers/ArtistController");

// Route for adding a new artist
Router.route('/Addartist')
  .post(createNewArtist)
  .get(getTopArtists);

// Route for searching artists by name
Router.route('/getart')
  .get(searchArtistsByName);

module.exports = Router;
