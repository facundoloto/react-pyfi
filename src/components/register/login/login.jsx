import React, { useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

import { Button, Form } from "react-bootstrap";
import { visiblePasswordStore } from "../../../store/visiblePasswordStore";

import Image from 'react-bootstrap/Image'
import logo from "./../../../assets/logo.png";
import styleLogin from "./../../register/form.module.css";
import "bootstrap/dist/css/bootstrap.css";

const ChangeInputForm = lazy(() => import("./changeInput"));

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isVisible = visiblePasswordStore((state) => state.isVisible);
  //it's works for look at input password

  const handleLogin = async () => {
    try {
      login(email, password);

      if (isAuthenticated) {
        navigate("/home");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styleLogin.loginContainer}>
      <section className={styleLogin.loginGroup}>
        <Form >

          <div class="text-center">
            <Image src={logo} alt="..." />
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We 'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type={isVisible}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <ChangeInputForm />
          </Form.Group>

          <Button onClick={handleLogin}>
            Submit
          </Button>

        </Form>
      </section>
    </div>
  );
};
