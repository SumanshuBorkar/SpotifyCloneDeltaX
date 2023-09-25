require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 2000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })})
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    })