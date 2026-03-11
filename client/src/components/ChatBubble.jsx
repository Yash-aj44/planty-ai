function ChatBubble({ role, text }) {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: role === "user" ? "flex-end" : "flex-start",
        margin: "10px"
      }}
    >
      <div
        style={{
          padding: "10px 15px",
          borderRadius: "15px",
          maxWidth: "60%",
          background: role === "user" ? "#6366f1" : "#1e293b",
          color: "white"
        }}
      >
        {text}
      </div>
    </div>
  );

}

export default ChatBubble;