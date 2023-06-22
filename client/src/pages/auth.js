import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080";

export const Auth = () => {
  return (
    <div className="auth">
      <div>
        <Login />
      </div>
      <div>
        <Register />
      </div>
    
   
    </div>
  );
};
//render two components just for current page(we no share them between pages)


const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]); //get access to func which set the cookie

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {
      const result = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });

      setCookies("access_token", result.data.token); //get jwt been sent from backend and set to our cookie
      //set respond from api as our cookie
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/"); //wehn login we ridireted to home page
    } catch (error) {
      
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button className="save-btn" type="submit">Login</button>
      </form>
    </div>
  );
};

const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [_, setCookies] = useCookies(["access_token"]);
  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${BASE_URL}/auth/register`, {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button className="save-btn" type="submit">Register</button>
      </form>
    </div>
  );
};
