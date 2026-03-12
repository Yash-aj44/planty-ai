import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import "../styles/chat.css";

function Chat() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    try {

      const token = localStorage.getItem("token");

      setChat(prev => [
        ...prev,
        { role: "user", text: message }
      ]);

      setLoading(true);

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
        { role: "bot", text: res.data.reply }
      ]);

      setLoading(false);
      setMessage("");

    } catch (err) {

      console.log(err);
      alert("AI request failed");
      setLoading(false);

    }

  };

  return (

    <div className="app">

      <Sidebar />

      <div className="chat-area">

        <div className="messages">

          {chat.map((msg, i) => (

            <div
              key={i}
              className={msg.role === "user" ? "user-bubble" : "bot-bubble"}
            >
              {msg.text}
            </div>

          ))}

          {loading && (
            <div className="bot-bubble">
              Planty is thinking...
            </div>
          )}

          <div ref={bottomRef}></div>

        </div>

        <div className="input-area">

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Planty anything..."
          />

          <button onClick={sendMessage}>
            Send
          </button>

        </div>

      </div>

    </div>

  );

}

export default Chat;