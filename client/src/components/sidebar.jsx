import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div
      style={{
        width: "260px",
        background: "#0f172a",
        color: "white",
        height: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >

      <div>

        <h2 style={{ marginBottom: "30px" }}>
          Planty AI
        </h2>

        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "#6366f1",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          New Chat
        </button>

        <div style={{ marginTop: "20px" }}>

          <p style={{ opacity: 0.7 }}>
            Chat History
          </p>

          <div
            style={{
              marginTop: "10px",
              fontSize: "14px",
              opacity: 0.6
            }}
          >
            No chats yet
          </div>

        </div>

      </div>

      <button
        onClick={logout}
        style={{
          padding: "10px",
          background: "#ef4444",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

    </div>

  );

}

export default Sidebar;