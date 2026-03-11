const express = require("express");
const axios = require("axios");

const Message = require("../models/Message");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",auth,async(req,res)=>{

  const {message} = req.body;

  const aiResponse = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model:"llama3-8b-8192",
      messages:[{role:"user",content:message}]
    },
    {
      headers:{
        Authorization:`Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type":"application/json"
      }
    }
  );

  const reply = aiResponse.data.choices[0].message.content;

  await Message.create({
    userId:req.user.id,
    message,
    response:reply
  });

  res.json({reply});
});

module.exports = router;