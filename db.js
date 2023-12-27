const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://cmihir044:Mihir0808@cluster0.didcukr.mongodb.net/blogapp?retryWrites=true&w=majority",
  )
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => console.log(err));
