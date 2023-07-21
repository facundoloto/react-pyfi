import React, { useState, lazy } from "react";

const Login = lazy(() => import("./login/login"));
const SignUp = lazy(() => import("./signup/signup"));

export default function Register() {

  return (
    <section>
      <Login />
    </section>
  );
};
