import React, { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Avatar } from "@mui/material";

import { themeStore } from "../../../store/themeStore";
import { useAuthStore } from "../../../store/authStore";
import logoIg from './../../../assets/instagram.png';
import "./navBar.css";

const Post = lazy(() => import("./../../post/post"));

export default function Sidenav() {
  const id = useAuthStore((state) => state.idUser);
  const image = useAuthStore((state) => state.image);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const Profile = () => navigate("/profile/" + id);
  const Home = () => navigate("/");
  const isTheme = themeStore((state => state.theme));
  const changeTheme = themeStore((state) => state.changeTheme);

  const [logo, setLogo] = useState(isTheme == 'Light' ? logoIg : "https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png");
  // 
  const onClickTheme = () => {

    if (isTheme == "Light") {
      document.body.classList.add('dark');
      changeTheme("Dark");
      setLogo("https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png");

    }
    else {
      document.body.classList.remove('dark');
      changeTheme("Light");
      setLogo(logoIg);
    }

  };

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLogout = useAuthStore((state) => state.logout);

  const handleLogOut = async () => {
    try {
      isLogout();
      if (isAuthenticated) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={"sidenav " + isTheme}>

        <img
          className="sidenav__logo"
          src={logo}
          alt="Instagram Logo"
        />

        <div className="sidenav__buttons">
          <button className="sidenav__button" onClick={Home}>
            <HomeIcon />
            <span>Home</span>
          </button>

          <button className="sidenav__button" onClick={() => <Post state={show} changeState={setShow} />}>
            <AddCircleOutlineIcon />
            <span>Create</span>
          </button>
          <button className="sidenav__button" onClick={onClickTheme}>
            {
              isTheme === 'Dark' ? <DarkModeIcon /> : <LightModeIcon />
            }
            <span>{isTheme}</span>
          </button>
          <button className="sidenav__button" onClick={Profile}>
            <Avatar src={image} />
            <span>
              Profile
            </span>
          </button>
          <button className="sidenav__button" onClick={handleLogOut}>
            <ExitToAppIcon />
            <span>
              LogOut
            </span>
          </button>
        </div>
      </div>

    </>
  );
}
