import React, { useState, lazy } from "react";
import { useAuthStore } from "../../../store/authStore";
import { themeStore } from "../../../store/themeStore";
import { Button, Form } from "react-bootstrap";
import { visiblePasswordStore } from "../../../store/visiblePasswordStore";

import GoogleLoginAuth from "./authGoogle";
import Image from 'react-bootstrap/Image'
import "./login.css";


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isTheme = themeStore((state => state.theme));
  const changeTheme = themeStore((state) => state.changeTheme);
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isVisible = visiblePasswordStore((state) => state.isVisible);
  //it's works for look at input password

  const handleLogin = async () => {
    try {
      const type = 'system';
      const data = { email: email, password: password };
      login(type, data);
    } catch (error) {
      console.log(error);
    }
  }

  const onClickTheme = () => {
    if (isTheme == "Light") {
      document.body.classList.add('dark');
      changeTheme("Dark");
    } else {
      document.body.classList.remove('dark');
      changeTheme("Light");
    }
  };


  return (
    <div className="container">

      <div className="main-content">

        <div className="form-container">

          <div className="form-content box">


            <div className="signin-form" id="signin-form">

              <div className="form-group">

                <div className="animate-input">

                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

              </div>

              <div className="form-group">
                <div className="animate-input">
                  <Form.Control
                    type={isVisible}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button>Show</button>
                </div>
              </div>

              <div className="btn-group">
                <button className="btn-login" id="signin-btn" onClick={handleLogin} >
                  Log In
                </button>
              </div>

              <div className="divine">
                <div></div>
                <div>OR</div>
                <div></div>
              </div>

              <div className="btn-group">
                <button className="btn-fb">
                  {/* <img src="./images/facebook-icon.png" alt="" />
                  <span>Log in with Facebook</span> */}
                  <GoogleLoginAuth />
                </button>
              </div>

              {/* <a href="#" className="forgot-pw">Forgot password?</a> */}
            </div>
          </div>

          <div className="box goto">
            <p>
              Don't have an account?
              <a href="/signup/">Sign up</a>
            </p>
          </div>

        </div>

      </div>

      <div class="footer">
        <div class="links">
          <button id="darkmode-toggle" onClick={onClickTheme}>{isTheme}</button>
        </div>
        <div class="copyright">
          © 2023 Post Your Favorite Image
        </div>
      </div>
    </div>
  );
};
