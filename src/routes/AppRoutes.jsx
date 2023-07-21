import { lazy, createContext, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { themeStore } from "../store/themeStore";

const ProtectedRoute = lazy(() => import("../utils/protectedRoute"));
const ProtectedLogin = lazy(() => import("../utils/protectedLogin"));
const Register = lazy(() => import("../components/register/register"));
const SignUp = lazy(() => import("./../components/register/signup/signup"));
const Home = lazy(() => import("../components/home/Home"));
const Menu = lazy(() => import("../components/menu/NavBar/NavBar"));
const Profile = lazy(() => import("../components/profile/Profile"));

const AppRoutes = () => {
    const isTheme = themeStore((state => state.theme));
    isTheme == "Dark" ? document.body.classList.add('dark') : document.body.classList.remove('dark');

    return (
        <>
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
                        <Route exact path="/signup/" element={
                            <ProtectedLogin>
                                <SignUp />
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
                            path="/profile/:profileID"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Suspense>
                <ProtectedRoute>
                    <Menu />
                </ProtectedRoute>
            </BrowserRouter>
        </>
    );
};

export default AppRoutes;