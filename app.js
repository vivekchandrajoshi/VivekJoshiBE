const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/send-message", (req, res) => {
  res.status(200).send("test data");
  // We will be coding here
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
