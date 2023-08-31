const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

dotenv.config();
let app = express();

app.get("*", (req, res) => {
  let fileName = req.url.toString().replace("/", "").replace("\\", "");
  res.download(path.join(__dirname, "resources", fileName));
});

app.use(express.static("./resources"));
app.listen(process.env.PORT);
