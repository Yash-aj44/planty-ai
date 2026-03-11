import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const loginUser = async () => {

    try{

      const res = await API.post("/auth/login",{
        email,
        password
      });

      localStorage.setItem("token",res.data.token);

      navigate("/chat");

    }catch(err){

      alert("Login failed");

    }

  };

  return(

    <div className="container">

      <div className="card">

        <h1>🌿 Planty AI</h1>

        <input
          className="input"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="button"
          onClick={loginUser}
        >
          Login
        </button>

        <span
          className="link"
          onClick={()=>navigate("/signup")}
        >
          Create account
        </span>

      </div>

    </div>

  );

}

export default Login;