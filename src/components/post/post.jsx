import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Icon } from 'semantic-ui-react'
import stylePost from './../menu/var.module.css'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from './post.module.css';
import 'semantic-ui-css/semantic.min.css'

function postForm(){

const handleSubmit = (elements) => {
  elements.preventDefualt();
  const formData = new FormData(elements.target);
  const postData = {}
}

}



export default function Post({ state, changeState }) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <>
      {
        state &&
        <Modal show={state} onHide={changeState} >
          <div className={styles.bgModal}>

            <Modal.Header closeButton>
              <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <div className="file is-warning is-boxed" >
                    <label class="file-label" className={styles.file}>
                      <input className="file-input" type="file" name="image" />
                      <Icon name='cloud upload' />
                      select image
                    </label>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Control as="textarea" placeholder='write your felling' rows={3} name="description" />
                </Form.Group>

              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit" variant="primary" onClick={() => changeState(false)}>
                Create
              </Button>
            </Modal.Footer>

          </div>
        </Modal>
      }
    </>
  );
};
