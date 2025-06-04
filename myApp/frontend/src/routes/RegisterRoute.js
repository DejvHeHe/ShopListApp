import React, { useEffect, useState } from "react";
import '../App.css';
import{register} from "../api"

function RegisterRoute()
{
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[passwordAgain,setPasswordAgain]=useState("")

    function handleRegister(e)
    {
        e.preventDefault();
        if(password===passwordAgain)
        {
            const data={
                email:email,
                password:password
            }

            register(data)
        }
        else{
            alert("Hesla se neshodují")
        }
    }
    return(
        <div className="registerroute">
            <h1>Shoplist registrace</h1>
            <form onSubmit={handleRegister}>
                
                <input type="email"placeholder="E-mailová adresa" onChange={(e) => setEmail(e.target.value)}required></input>
                <input type="password" placeholder="Heslo" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <input type="password" placeholder="Heslo znovu"value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} required></input>
                <button type="submit">Potvrdit</button>                
                <label>
                    <a href="/login">Přihlásit se k existujícímu učtu</a>

                </label>
            </form>
        </div>
    );
}
export default RegisterRoute;