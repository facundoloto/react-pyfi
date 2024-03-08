import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { themeStore } from "../store/themeStore";
import Loader from "../components/Loader/Loader";

const ProtectedRoute = lazy(() => import(".././utils/protectedRoute"));
const Login = lazy(() => import("./../components/Auth/Login/login"));
const SignUp = lazy(() => import("./../components/Auth/SignUp/signup"));
const Home = lazy(() => import("./../components/Home/Home"));
const Profile = lazy(() => import(".././components/Profile/Profile"));

const AppRoutes = () => {

    const isTheme = themeStore((state => state.theme));
    isTheme == "Dark" ? document.body.classList.add('dark') : document.body.classList.remove('dark');

    return (
        <>
            <Suspense fallback={<Loader isLoading={true} />}>
                <Routes>
                    <Route element={<ProtectedRoute withUserAuth={false} />}>
                        <Route exact path="/login" element={< Login />} />
                        <Route exact path="/signup" element={<SignUp />} />
                    </Route>

                    <Route element={<ProtectedRoute withUserAuth={true} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile/:profileID" element={<Profile />} />
                    </Route>

                </Routes>
            </Suspense>
        </>
    );
};

export default AppRoutes;