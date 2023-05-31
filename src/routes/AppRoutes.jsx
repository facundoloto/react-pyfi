import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BounceLoader } from "react-spinners";

const ProtectedRoute = lazy(() => import("../utils/protectedRoute"));
const ProtectedLogin = lazy(() => import("../utils/protectedLogin"));
const Register = lazy(() => import("../components/register/register"));
const Home = lazy(() => import("../components/home/Home"));
const Menu = lazy(() => import("../components/menu/Menu"));
const Profile = lazy(() => import("../components/profile/Profile"));

const AppRoutes = () => {

    return (
        <BrowserRouter>

            <Suspense
                fallback={
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            // transform: "translate(-50%,-50%)",
                            // color: 'purple',
                            // fontSize: '22px',
                        }}>
                        <BounceLoader color="rgb(186, 144, 198)" />
                    </div>}>

                <Routes>
                    <Route exact path="/login/" element={
                        <ProtectedLogin>
                            <Register />
                        </ProtectedLogin>
                    } />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                        <Route
                        path="/profile/"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <ProtectedRoute>
                    <Menu />
                </ProtectedRoute>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;