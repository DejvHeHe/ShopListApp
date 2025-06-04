//LoginRoute
import React, { useEffect, useState } from "react";
import '../App.css';
import{login} from "../api"
import { useNavigate } from 'react-router-dom';


function LoginRoute()
{
    const navigate = useNavigate();
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    async function handleLogin(e)
    {
        e.preventDefault();
        const data={
            email:email,
            password:password
        }    
        const token=await login(data)
        if(token)
        {
            localStorage.setItem("authToken", token);
            navigate("/")
        }

            
            
    }
    return(
        <div className="loginroute">
            <h1>Shoplist login</h1>
            <form onSubmit={handleLogin}>
                
                <input type="email"placeholder="E-mailová adresa" onChange={(e) => setEmail(e.target.value)}required></input>
                <input type="password" placeholder="Heslo" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <button type="submit">Potvrdit</button>                
                <label href>
                    <a href="/register">Vytvořit nový účet</a>
                </label>
            </form>
        </div>
    );

}
export default LoginRoute;