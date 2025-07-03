require("dotenv").config();
const express = require("express");

const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.get("/test", (req, res) => {
  const name = req.query.name;
  const age = req.query.age;
  res.send(`Привет, ${name}! Тебе ${age} лет.`);
});

app.get("/message", async (req, res) => {
  const message = req.query.message;
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-3n-e4b-it:free",
          messages: [{ "role": "user", "content": String(message) }],
        }),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
