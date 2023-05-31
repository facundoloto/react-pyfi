import React, { useState, lazy } from "react";
import { Button } from "react-bootstrap";
import styleRegister from "./register.module.css";
import "./form.module.css";


const Login = lazy(() => import("./login/login"));
const SignUp = lazy(() => import("./signup/signup"));

export default function Register() {
  const [changeLogin, setChangeLogin] = useState(styleRegister.enabled);
  const [changeSignUp, setChangeSignUp] = useState(styleRegister.disabled);
  const [type, setType] = useState("sign up");
  const [change, setChange] = useState(true);

  const changeInput = () => {
    //function for when the user will touch in show password
    if (change === true) {
      setType("sign in");
      setChangeLogin(styleRegister.disabled);
      setChangeSignUp(styleRegister.enabled);
      setChange(false);
    } else {
      setType("sing up");
      setChangeSignUp(styleRegister.disabled);
      setChangeLogin(styleRegister.enabled);
      setChange(true);
    }
  };

  return (
    <div className={styleRegister.Background}>
      <div className={styleRegister.registerContainer}>

        <section className={changeSignUp}>
          <SignUp />
        </section>

        <section className={changeLogin}>
          <Login />
        </section>

        <div className={styleRegister.change}>

          <section>
            <Button variant="outline-warning" onClick={changeInput}>{type}</Button>
          </section>

        </div>

      </div>
    </div>
  );
};
