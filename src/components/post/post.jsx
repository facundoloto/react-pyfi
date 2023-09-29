import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from '../../store/authStore';
import { sendPost } from '../../api/fetchApi';
import { themeStore } from "./../../store/themeStore";
import { Button, Form, Modal } from 'react-bootstrap';
import Loader from "../Loader/Loader";
import imageIcon from "./../../assets/imageIcon.png";
import stylePost from "./post.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Post({ show, handleClose }) {
  const { register, handleSubmit } = useForm();
  const [imagenPost, setImagePost] = useState(imageIcon);
  const idUser = useAuthStore((state) => state.idUser);
  const isTheme = themeStore((state => state.theme));
  const [loading, setLoading] = useState(false);
  /* it function works to set prewiev imagen before to sent from server*/
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImagePost(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("user", idUser);
    formData.append("image", data.image[0]);
    formData.append("description", data.description);

    await sendPost(formData);
    setLoading(false);
    handleClose();
  };


  return (
    <>

      <div className='modal' >
        <Modal show={show} onHide={handleClose}>
          {loading ? <Loader isLoading={true} /> : null}

          <Modal.Header className={isTheme} closeButton>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>

          <Modal.Body className={isTheme}>
            <Form onSubmit={handleSubmit(onSubmit)} >

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <div className="file is-warning is-boxed" >
                  <label className="file-label">
                    <input className="file-input"
                      type="file"
                      {...register("image")}
                      onChange={handleImageChange} required />
                    select image
                  </label>
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <img src={imagenPost} className={stylePost.fileImg} alt="Preview" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" placeholder='write your felling' rows={3}  {...register("description")} />
              </Form.Group>
              <Button type="submit" >
                Create
              </Button>
            </Form>
          </Modal.Body>

        </Modal>


      </div>

    </>
  );
}
