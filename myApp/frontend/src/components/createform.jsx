import '../App.css';
import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function CreateForm({ text }) {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => setShow(false);

  const submit = () => {
    console.log("Submitted value:", inputValue);
    // You could also pass this value to a parent or save it somewhere
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <p>{text}</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submit}>
          Potvrdit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateForm;
