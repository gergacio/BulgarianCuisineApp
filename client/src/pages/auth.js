import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"


export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    );
}

const Login = () => {
    //state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [, setCookies] = useCookies("access_token");

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                 password
            });
            //set response from our API as cookie
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
          
        }catch (err){
            console.error(err);
        }
    }
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input 
                            type="text" 
                            id="username" 
                            value={username}
                            onChange={(event) => setUsername(event.target.value) }/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input 
                            type="text" 
                            id="password" 
                            value={password}
                            onChange={(event) => setPassword(event.target.value) }/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );

}
const Register = () => {
    //state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/auth/register", {username, password});
            alert("Registration Completed! Now login.");

        }catch (err){
            console.error(err);
        }
    }
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input 
                            type="text" 
                            id="username" 
                            value={username}
                            onChange={(event) => setUsername(event.target.value) }/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(event) => setPassword(event.target.value) }/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );

}
