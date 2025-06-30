import React, { useState } from "react";
import '../App.css';
import { login } from "../api";
import { useNavigate } from 'react-router-dom';

function LoginRoute() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        const data = { email, password };
        
        const token = await login(data); // login() already saves token internally
        
        if (token) {
            // Don't set token here again!
            navigate("/");
        } else {
            alert("Login failed. Check your credentials.");
        }
    }

    return (
        <div className="loginroute">
            <h1>Shoplist login</h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="E-mailová adresa" 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Heslo" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button  className="formbutton"type="submit">Potvrdit</button>                
                <label>
                    <a href="/register">Vytvořit nový účet</a>
                </label>
            </form>
        </div>
    );
}

export default LoginRoute;
