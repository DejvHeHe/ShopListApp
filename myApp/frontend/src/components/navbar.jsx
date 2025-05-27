import React from "react";
import "../App.css"

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/items">Položky</a></li>
        
      </ul>
    </nav>
  );
}

export default Navbar