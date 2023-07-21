import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedLogin = ({ children }) => {
  const user = useAuthStore((state) => state.isAuthenticated);

  if (user == true) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedLogin;

