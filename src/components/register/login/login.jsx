import React, { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { visiblePasswordStore } from "../../../store/visiblePasswordStore";
import { Form } from "react-bootstrap";
import "./login.css";
import GoogleLoginAuth from "./authGoogle";
import OnClickTheme from "../../../utils/changeTheme";


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const isVisible = visiblePasswordStore((state) => state.isVisible);
  //it's works for look at input password

  const handleLogin = () => {
    try {
      const type = 'system';
      const data = { email: email, password: password };
      login(type, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">

      <div className="main-content">

        <div className="form-container">
          <Form>
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
                      autoComplete="on"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Show</button>
                  </div>
                </div>

                <div className="btn-group">
                  <button className="btn-login" type='button' id="signin-btn" onClick={handleLogin} >
                    Log In
                  </button>
                </div>

                <div className="divine">
                  <div></div>
                  <div>OR</div>
                  <div></div>
                </div>
              </div>
            </div>
          </Form>
          <div className="btn-group">
            <GoogleLoginAuth />
          </div>
          <div className="box goto">
            <p>
              Dont have an account?
              <a href="/signup/">Sign up</a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="links">
          <OnClickTheme />
        </div>
        <div className="copyright">
          © 2023 Post Your Favorite Image
        </div>
      </div>
    </div>
  );
}
