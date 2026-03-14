const express = require("express");
const axios = require("axios");
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    await Message.create({
      userId: req.user.id,
      message: message,
      response: reply
    });

    res.json({ reply });

  } catch (error) {

    console.log("CHAT ERROR:");
    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "AI request failed"
    });
  }
});

module.exports = router;