import React, { useState } from "react";
import { themeStore } from "../../../store/themeStore";
import { Button, Form } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import { useForm } from "react-hook-form";
import { routes } from "../routes/routesApi";
import { postMethodBody } from "../../../utils/httpMethods";
import { signUp } from "./checkUpUser";
import "./../login/login.css";

export default function SignUp() {
    const { register, handleSubmit } = useForm();

    const isTheme = themeStore((state => state.theme));
    const changeTheme = themeStore((state) => state.changeTheme);


    const onSubmit = async (data) => {
        const response = await postMethodBody(routes.signUp, data);
        await signUp(response);
    };

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

                            <Form onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-group">
                                    <div className="animate-input">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter name"
                                            {...register("name")}

                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="animate-input">
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            {...register("email")}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="animate-input">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            {...register("password")}
                                        />
                                        <button>Show</button>
                                    </div>
                                </div>

                                <div className="btn-group">
                                    <button className="btn-login" id="signin-btn" type="submit" >
                                        Register
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="box goto">
                        <p>
                            have you an account?
                            <a href="/login/">Log In</a>
                        </p>
                    </div>

                </div>

            </div>

            <div className="footer">
                <div className="links">
                    <button id="darkmode-toggle" onClick={onClickTheme}>{isTheme}</button>
                </div>
                <div className="copyright">
                    © 2023 Post Your Favorite Image
                </div>
            </div>
        </div>

    );
}
