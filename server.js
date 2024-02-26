const PORT = 8002;
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);
app.post("/gemini", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: req.body.history,
  });
  const msg = await req.body.message;
  const result = await chat.sendMessage(msg);
  const response = result.response;
  const text = response.text();
  res.send(text);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
