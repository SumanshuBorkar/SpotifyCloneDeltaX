const Song = require("./../Modles/Song");
const expressAsyncHandler = require( 'express-async-handler' );
const multer = require("multer")
const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const User = require( './../Modles/User' );

// Uploading Album Art ====================

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
  })
  

  //    this is multer code.
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: 'InstaClone Images',
    },
  });
  const upload =  multer({
    storage:storage
  })
  const middleware = upload.single("file");

// Adding New Song =================

  const createNewSong = expressAsyncHandler(async (req, res) => {
    console.log(req.body.userId)
    try {    
      const ReqUser = await User.findById(req.body.userId.slice(1, req.body.userId.length - 1));
      if (!ReqUser) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        const newPost = new Song({
          file: {
            url: req.file.path,
            imageId: `${Date.now()}/${req.file.filename}`,
          },
          userId: ReqUser._id,
          releasedate: req.body.releasedate,
          artist: req.body.artist,
          songname: req.body.songname
        });
    
        const createdPost = await newPost.save();
  
        // Include the userId in the response
        res.status(201).json({ ...createdPost.toObject(), userId: ReqUser._id });
      }
    } catch (error) {
     
      res.status(400).json({ message: 'Post is not created' });
    }
  });

  const getAllSongs = expressAsyncHandler(async (req, res) => {
  
    try {
      const songs = await Song.find().limit(10)
  
      res.status(200).json(songs);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = {middleware, createNewSong, getAllSongs};



