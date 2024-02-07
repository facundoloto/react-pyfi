import { useState } from "react";
import { redirect } from "react-router-dom";
import { loginBySystem } from "../../../api/fetchApi";
import { useAuthStore } from "../../../store/authStore";
import { Form } from "react-bootstrap";
import Cookies from 'universal-cookie';

import Swal from "sweetalert2";
import GoogleLoginAuth from "./authGoogle";
import OnClickTheme from "../../../utils/changeTheme";
import Loader from "../../Loader/Loader";
import "./login.css";


export default function Login() {
  const cookies = new Cookies();

  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //it's works for look at input password

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = { email: email, password: password };
      const response = await loginBySystem(data);

      if (response.status === 200) {
        cookies.set("token", response.data.token);

        Swal.fire({
          icon: "success",
          title: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        login(response.data.data);
        setLoading(false);
        redirect("/");
      }
      else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email or Password wrong,Try again!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {loading ? <Loader isLoading={true} /> : null}
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
                      autoComplete="on"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                </div>

                <div className="form-group">
                  <div className="animate-input">
                    <Form.Control
                      placeholder="Password"
                      type="text"
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
