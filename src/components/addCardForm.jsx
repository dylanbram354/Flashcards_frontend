import React, { useState } from 'react';
import useForm from './useForm';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

const AddCardForm = (props) => {

    const { values, handleChange, handleSubmit } = useForm(submitCard);
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function submitCard(){
        let newCard = {...values};
        try{
            await axios.post(`http://127.0.0.1:8000/flashcards/investigate_collection/${props.collectionId}`, newCard);
            setSubmitted(true);
            setTimeout(() => {setShow(false); setSubmitted(false)}, 700);
        }
        catch(err){
            alert(err);
            return
        }
        
    }

    return(
        <>
            <Button size='sm' variant="outline-primary" onClick={handleShow}>
                Add Card
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add New Flashcard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="word">
                            <Form.Label>Word</Form.Label>
                            <Form.Control type="text" placeholder="Enter word here" name='word' onChange={handleChange} value={values.word} required={true}/>
                        </Form.Group>
                        <Form.Group controlId="definition">
                            <Form.Label>Definition</Form.Label>
                            <Form.Control type="text" placeholder="Enter definition here" name='definition' onChange={handleChange} value={values.definition} required={true}/>
                        </Form.Group>
                        <div className='row'>
                            <div className='col-md-8 col-0'></div>
                            <Button variant="secondary" className='mr-2' onClick={handleClose}>
                                Close
                            </Button>
                            {submitted ? <h4 className='text-center'>Added!</h4> : <Button type='submit' variant="primary">Submit</Button>}
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddCardForm