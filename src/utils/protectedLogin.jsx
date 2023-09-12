import { redirect, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRouteLogin() {
    const user = useAuthStore((state) => state.isAuthenticated);
    if (user) {
        redirect("/login");
    }
    else {
        return <Outlet />;
    }
}