import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    username:"",
    email:"",
    password:""
  });

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    await API.post("/auth/signup",form);

    navigate("/");
  };

  return(

    <div>

      <h2>Planty AI Signup</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="username"
          placeholder="username"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="email"
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
        />

        <button>Signup</button>

      </form>

    </div>

  );
}

export default Signup;