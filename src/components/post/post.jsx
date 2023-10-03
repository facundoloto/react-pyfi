import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from '../../store/authStore';
import { sendPost } from '../../api/fetchApi';
import { themeStore } from "./../../store/themeStore";
import { Button, Form, Modal } from 'react-bootstrap';

import Swal from "sweetalert2";
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
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Regular expression to match image files by extension this works to verify the kind of image
      const imageFileRegex = /\.(jpg|jpeg|png|gif)$/i;

      if (imageFileRegex.test(selectedFile.name)) {
        //if pass the right format this works to change image in input file label
        const reader = new FileReader();

        reader.onload = () => {
          setImagePost(reader.result);
        };

        if (selectedFile) {
          reader.readAsDataURL(selectedFile);
        }

      }
      else {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "image hasn't format right!",
        });
      }

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
