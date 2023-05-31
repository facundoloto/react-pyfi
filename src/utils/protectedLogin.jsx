import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
// function isAuthenticated() {
//   return localStorage.getItem('login') !== null;
// }

const ProtectedLogin = ({ children }) => {
  const user = useAuthStore((state) => state.isAuthenticated);

  if (user=== true ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedLogin;

