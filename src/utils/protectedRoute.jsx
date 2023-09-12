import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ withUserAuth }) {
  const user = useAuthStore((state) => state.isAuthenticated);

  if (withUserAuth) {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }
  else {
    return user ? <Navigate to="/" /> : <Outlet />;
  }
}
