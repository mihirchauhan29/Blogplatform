const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;
const db = require("./db");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://replit.com");

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With,Content-Type,Accept",
//   );
//   next();
// });

app.use(bodyParser.json());

app.use("/users", authRoutes);
app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "welcome to the api",
  });
});

app.listen(PORT, () => {
  console.log("server is running");
});
