import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useAuthStore } from '../../store/authStore';
import { getUserById, updateUser } from '../../api/fetchApi';
import { themeStore } from "../../store/themeStore";
import { Button, Form, Modal } from 'react-bootstrap';
import Loader from "../Loader/Loader";

import 'bootstrap/dist/css/bootstrap.min.css';
import './../post/post.css';

export default function FormProfile({ show, handleClose }) {
    const { register, handleSubmit } = useForm();
    const idUser = useAuthStore((state) => state.idUser);
    const updateUserStorage = useAuthStore((state) => state.updateUser);

    const isTheme = themeStore((state => state.theme));
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({
        name: useAuthStore((state) => state.name),
        image: useAuthStore((state) => state.image),
        // Add more fields as needed
    });

    /* it function works to set prewiev imagen before to sent from server*/
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setUserData((prevData) => ({
                ...prevData,
                image: reader.result,
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const imageFile = e.target.files[0];
            setUserData((prevData) => ({
                ...prevData,
                image: imageFile,
            }));
        } else {
            setUserData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("image", data.image[0]);

        await updateUser(idUser, formData);

        const userInfo = await getUserById(idUser);
        updateUserStorage({ "name": userInfo.result.name, "image_user": userInfo.result.image_user });
        setLoading(false);
        handleClose();
    };

    return (
        <>
            <div className='modal' >
                {
                    <Modal show={show} onHide={handleClose}>
                        {loading ? <Loader isLoading={true} /> : null}

                        <Modal.Header className={isTheme} closeButton>
                            <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>

                        <Modal.Body className={isTheme}>
                            <Form onSubmit={handleSubmit(onSubmit)} >
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control
                                        type="text"
                                        rows={3}
                                        value={userData.name}
                                        onChange={handleChange}
                                        {...register("name")}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <div className="file is-warning is-boxed" >
                                        <label className="file-label">
                                            <input
                                                className="file-input"
                                                type="file"
                                                {...register("image")}
                                                onChange={handleImageChange}
                                                required
                                            />
                                            select image
                                        </label>
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <img src={userData.image} alt="Preview" />
                                </Form.Group>
                                <Button type="submit" >
                                    Update
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                }
            </div>

        </>
    );
}
