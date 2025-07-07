require("dotenv").config();
const express = require("express");

const port = 3000;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const token = req.headers["x-client-token"];
  if (token !== process.env.TRUSTED_CLIENT_TOKEN) {
    console.log("request with wrong token. Time:", Date.now());
    return res.status(403).send("Forbidden");
  }
  next();
});

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
