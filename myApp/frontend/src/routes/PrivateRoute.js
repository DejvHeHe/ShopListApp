import { Navigate } from "react-router-dom";

function PrivateRoute({ children}) {
  const isLoggedIn = localStorage.getItem("token"); // or any other auth check
  return isLoggedIn ? children: <Navigate to="/login" />;
}

export default PrivateRoute;
