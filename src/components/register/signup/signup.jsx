import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import { useForm } from "react-hook-form";
import { routes } from "../routes/routesApi";
import { postMethodBody } from "../../../utils/httpMethods";
import { signUp } from "./checkUpUser";
import styleLogin from "./../form.module.css";
import logo from "./../../../assets/logo.png";
import "bootstrap/dist/css/bootstrap.css";

export default function SignUp() {
    const [changeType, setChangeType] = useState("password"); //this function like value when it will do click in show password
    const [change, setChange] = useState(true); //it's to evalue when touch show password
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const response = await postMethodBody(routes.signUp, data);
        await signUp(response);
    }


    const changeInput = () => {
        //function for when the user will touch in show password
        if (change === true) {
            setChangeType("text");
            setChange(false);
        } else {
            setChangeType("password");
            setChange(true);
        }
    };

    return (
        <div className={styleLogin.loginBackground}>
            <div className={styleLogin.loginContainer}>

                <section className={styleLogin.loginGroup}>
                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <div class="text-center">
                            <Image src={logo} alt="..." />
                        </div>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                {...register("name")}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                {...register("email")}
                            />
                            <Form.Text className="text-muted">
                                We 'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type={changeType}
                                placeholder="Password"
                                {...register("password")}
                            />
                        </Form.Group>

                        <Form.Text className="text-muted">
                                choose an image for your account
                            </Form.Text>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" placeholder="enter image" {...register("image")}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                onClick={changeInput}
                                label="Check me out"
                            />
                        </Form.Group>

                        <Button type="submit">
                            Submit
                        </Button>

                    </Form>
                </section>

            </div>
        </div>
    );
}
