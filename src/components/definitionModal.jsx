import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const DefinitionModal = (props) => {

    const [show, setShow] = useState(false);

    const handleShow = () => {setShow(true)};
    const handleClose = () => setShow(false);

    return (
        <>
          <Button variant="success" onClick={handleShow}>
            Definition
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{props.word}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.definition}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
    )
}

export default DefinitionModal