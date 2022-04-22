const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(process.env.PORT, () => {
  console.log(`Application running on port:${process.env.PORT}`);
});
