import { useState } from "react";
import API from "../services/api";
import ChatBubble from "../components/ChatBubble";
import Sidebar from "../components/sidebar";

function Chat() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    try {

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/chat",
        { message },
        {
          headers: {
             Authorization: `Bearer ${token}`
          }
        }
      );

      setChat(prev => [
        ...prev,
        { role: "user", text: message },
        { role: "bot", text: res.data.reply }
      ]);

      setMessage("");

    } catch (error) {

      console.error(error);
      alert("AI request failed");

    }

  };

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>

        <h1>Planty AI</h1>

        <div>

          {chat.map((msg, i) => (
            <ChatBubble
              key={i}
              role={msg.role}
              text={msg.text}
            />
          ))}

        </div>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Planty something..."
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>

  );

}

export default Chat;