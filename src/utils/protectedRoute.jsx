import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  if (user == true) {
    return children;
  }

  return navigate("/login/");
};

export default ProtectedRoute;

