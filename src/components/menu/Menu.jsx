import { lazy, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';
import icons from "./icon";

import { themeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";

import logoDark from "./../../assets/instagram.png";
import logoLight from './../../assets/instagramLight.png';
import styleMenu from "./menu.module.css";

const Post = lazy(() => import("./../post/post"));

function Navbar() {
  const navigate = useNavigate();
  const isActive = useAuthStore((state) => state.isAuthenticated);
  const id = useAuthStore((state) => state.idUser);
  const image = useAuthStore((state) => state.image);
  const isTheme = themeStore((state => state.theme));
  const changeTheme = themeStore((state) => state.changeTheme);
  const isLogout = useAuthStore((state) => state.logout);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logo, setLogo] = useState(isTheme == 'Light' ? logoDark : logoLight);
  const [colorIcon, setColorIcon] = useState(isTheme == 'Light' ? "" : pink[500]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onClickTheme = () => {
    if (isTheme == "Light") {
      setLogo(logoLight);
      setColorIcon(pink[500]);
      document.body.classList.add('dark');
      changeTheme("Dark");

    }
    else {
      setLogo(logoDark);
      document.body.classList.remove('dark');
      setColorIcon("");
      changeTheme("Light");
    }
  };

  const handleLogOut = () => {
    try {
      isLogout();
      if (isAuthenticated) {
        navigate("/login/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // // // // Simulate checking authentication state on component mount
  useEffect(() => {
    setIsAuthenticated(isActive);
  }, [isActive]);

  return (
    <>
      {
        isAuthenticated && (
          <nav>
            <div className={styleMenu.sidenav + " " + isTheme}>
              <img
                className={styleMenu.sidenavLogo}
                src={logo}
                alt="Instagram Logo"
              />

              <div className={styleMenu.sidenavButtons}>

                <button className={styleMenu.sidenavButton} onClick={() => navigate('/')} >
                  <icons.home sx={{ color: colorIcon }} />
                  <span>Home</span>
                </button>

                <button className={styleMenu.sidenavButton} onClick={openModal}>
                  <icons.create sx={{ color: colorIcon }} />
                  <span>Create</span>
                </button>

                <button className={styleMenu.sidenavButton} onClick={onClickTheme}>
                  {
                    isTheme === 'Dark' ? <icons.dark sx={{ color: colorIcon }} /> : <icons.light />
                  }
                  <span>{isTheme}</span>
                </button>

                <button type="button" className={styleMenu.sidenavButton} onClick={() => navigate('/profile/' + id)}>
                  <icons.profile src={image} />
                  <span>
                    Profile
                  </span>
                </button>

                <button className={styleMenu.sidenavButton} onClick={handleLogOut}>
                  <icons.exit sx={{ color: colorIcon }} />
                  <span>
                    LogOut
                  </span>
                </button>
              </div>
              <Post show={showModal} handleClose={closeModal} />
            </div>
          </nav>

        )
      }
    </>
  );
}


export default Navbar;