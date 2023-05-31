import React, { useState } from "react";
import { visiblePasswordStore } from "../../../store/visiblePasswordStore";
import {  Form } from "react-bootstrap";

const changeInput = (change) => {
    //function for when the user will touch in show password
    if (change === true) {
        return {type:'text', change: false}
    } else {
        return {type:'password', change: true}
    }
  };

export default function ChangeInputForm() {
  const [changeType, setChangeType] = useState("password");
  const [change, setChange] = useState(true); 
  const visibleInput = visiblePasswordStore((state) => state.visibleInput);

    //it's works for look at input password
    const inputChange = () => {
        const checkInput = changeInput(change);

        setChangeType(checkInput.type);
        setChange(checkInput.change);

        visibleInput(changeType);
    };

    return (
        <>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    onClick={inputChange}
                    label="Check me out"
                />
            </Form.Group>
        </>
    );
};
