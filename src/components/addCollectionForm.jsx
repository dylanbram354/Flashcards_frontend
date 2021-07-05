import React, { useState } from 'react';
import useForm from './useForm';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'


const AddCollectionForm = (props) => {

    const { values, handleChange, handleSubmit } = useForm(submitCard);
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function submitCard(){
        let newCollection = {...values};
        try{
            await axios.post(`http://127.0.0.1:8000/flashcards/collections`, newCollection);
            setSubmitted(true);
            setTimeout(() => {setShow(false); setSubmitted(false)}, 700);
            props.refresh()
        }
        catch(err){
            alert(err);
            return
        }
        
    }

    return(
        <>
            <div className='text-center mt-5'>
                <Button size='lg' variant="outline-warning" onClick={handleShow}>
                    New Collection
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Collection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="word">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter a name for your new collection" name='name' onChange={handleChange} value={values.word} required={true}/>
                        </Form.Group>
                        <Form.Group controlId="definition">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter collection description" name='description' onChange={handleChange} value={values.definition} required={true}/>
                        </Form.Group>
                        <div className='row'>
                            <div className='col-md-8 col-0'></div>
                            <Button variant="secondary" className='mr-2' onClick={handleClose}>
                                Close
                            </Button>
                            {submitted ? <p className='text-center'>Submitted!</p> : <Button type='submit' variant="primary">Submit</Button>}
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddCollectionForm