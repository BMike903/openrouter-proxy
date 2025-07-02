require("dotenv").config();
const express = require("express");

const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send(process.env.OPENROUTER_API_KEY);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
