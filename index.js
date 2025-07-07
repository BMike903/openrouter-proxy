require("dotenv").config();
const express = require("express");
const qs = require("qs");

const port = 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nothing here, but server is working");
});

app.get("/returnJson", (req, res) => {
  res.json({ ...req.query });
});

app.post("/message", async (req, res) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
