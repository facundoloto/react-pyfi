import { lazy, useState, useEffect } from "react";
import { redirect } from 'react-router-dom';
import icons from "./icon";

import { themeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";

import logoDark from "./../../assets/instagram.png";
import logoLight from './../../assets/instagramLight.png';
import "./menu.css";

const Post = lazy(() => import("./../post/post"));

function Navbar() {

  const isActive = useAuthStore((state) => state.isAuthenticated);
  const id = useAuthStore((state) => state.idUser);
  const image = useAuthStore((state) => state.image);
  const isTheme = themeStore((state => state.theme));
  const changeTheme = themeStore((state) => state.changeTheme);
  const isLogout = useAuthStore((state) => state.logout);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [logo, setLogo] = useState(isTheme == 'Light' ? logoDark : logoLight);
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
      document.body.classList.add('dark');
      changeTheme("Dark");

    }
    else {
      setLogo(logoDark);
      document.body.classList.remove('dark');
      changeTheme("Light");
    }
  };

  const handleLogOut = () => {
    try {
      isLogout();
      if (isAuthenticated) {
        redirect("/login/");
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
            <div className={"sidenav " + isTheme}>
              <img
                className="sidenav__logo"
                src={logo}
                alt="Instagram Logo"
              />

              <div className="sidenav__buttons">

                <a href="/">
                  <button className="sidenav__button">
                    <icons.home />
                    <span>Home</span>
                  </button>
                </a>

                <button className="sidenav__button" onClick={openModal}>
                  <icons.create />
                  <span>Create</span>
                </button>

                <button className="sidenav__button" onClick={onClickTheme}>
                  {
                    isTheme === 'Dark' ? <icons.dark /> : <icons.light />
                  }
                  <span>{isTheme}</span>
                </button>

                <a className="nav-link active" aria-current="page" href={"/profile/" + id}>
                  <button type="button" className="sidenav__button">
                    <icons.profile src={image} />
                    <span>
                      Profile
                    </span>
                  </button>
                </a>

                <button className="sidenav__button" onClick={handleLogOut}>
                  <icons.exit />
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