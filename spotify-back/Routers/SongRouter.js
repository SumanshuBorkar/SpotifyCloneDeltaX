const express =require("express");
const Router = express.Router();
const {middleware, createNewSong, getAllSongs} = require("./../Controllers/SongController");
// const cors = require("cors");


Router
  .route('/Addsong')
  .post(middleware, createNewSong)
  .get(getAllSongs)


module.exports = Router;