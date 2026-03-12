import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const newChat = () => {
    window.location.reload();
  };

  return (

    <div className="sidebar">

      <div>

        <h2>🌿 Planty AI</h2>

        <button
          className="new-chat"
          onClick={newChat}
        >
          + New Chat
        </button>

        <div className="history">

          <p>Recent Chats</p>

          <div className="chat-item">
            Welcome Chat
          </div>

          <div className="chat-item">
            AI Questions
          </div>

          <div className="chat-item">
            Coding Help
          </div>

        </div>

      </div>

      <button
        className="logout"
        onClick={logout}
      >
        Logout
      </button>

    </div>

  );

}

export default Sidebar;