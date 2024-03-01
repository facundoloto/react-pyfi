import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { themeStore } from "../store/themeStore";

const ProtectedRoute = lazy(() => import("../utils/protectedRoute"));
const Register = lazy(() => import("../components/Auth/register"));
const SignUp = lazy(() => import("./../components/Auth/SignUp/signup"));
const Home = lazy(() => import("../components/Home/Home"));
const Profile = lazy(() => import("../components/Profile/Profile"));

const AppRoutes = () => {

    const isTheme = themeStore((state => state.theme));
    isTheme == "Dark" ? document.body.classList.add('dark') : document.body.classList.remove('dark');

    return (
        <>

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

                    <Route element={<ProtectedRoute withUserAuth={false} />}>
                        <Route exact path="/login" element={< Register />} />
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