const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UserRouter = require("./Routers/userRouter");
const SongRouter = require("./Routers/SongRouter");
const ArtistRouter = require("./Routers/ArtistRouter");


app.use("/user", UserRouter);

app.use("/songs", SongRouter);

app.use("/Artist" , ArtistRouter);


module.exports = app;