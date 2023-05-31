import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.isAuthenticated);
  if (user=== true ) {
    return children;
  }

  return <Navigate to="/login/" />;
};

export default ProtectedRoute;

