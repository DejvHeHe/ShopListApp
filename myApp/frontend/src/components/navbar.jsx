
import "../App.css"
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the stored token
    navigate("/login"); // Redirect to login page
};

  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/items">Položky</a></li>
        <li onClick={handleLogout}>Odhlásit se</li>
      </ul>
    </nav>
  );
}

export default Navbar