const Artist = require("./../Modles/Artist");
const expressAsyncHandler = require( 'express-async-handler' );



// Adding New Artist =================

const createNewArtist = expressAsyncHandler(async (req, res) => {
  const artistname = req.body.artistname;

  try {
    const ReqUser = await Artist.findOne({ artistname });

    if (ReqUser) {
      return res.status(404).json({ message: 'Artist Already Exists' });
    } else {
      const newPost = new Artist({
        DOB: req.body.DOB,
        artistname: req.body.artistname,
        bio: req.body.bio
      });

      await newPost.save();

      // Include the userId in the response
      res.status(201).json({ status: "Success" });
    }
  } catch (error) {
    res.status(400).json({ message: 'Post is not created' });
  }
});

const getTopArtists = expressAsyncHandler(async (req, res) => {
  try {
    const artists = await Artist.find().limit(10); // Retrieve the top 10 artists
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

const searchArtistsByName = expressAsyncHandler(async (req, res) => {
  const { search } = req.query; // Get the search query from the URL query parameters

  try {
    // Use a regular expression to perform a case-insensitive search by artist name
    const artists = await Artist.find({ artistname: { $regex: new RegExp(search, 'i') } });

    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = { createNewArtist, getTopArtists, searchArtistsByName};