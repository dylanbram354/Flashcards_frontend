import React, { useState } from 'react';
import useForm from './useForm';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const EditCardForm = (props) => {

    const { values, handleChange, handleSubmit, setValues } = useForm(submitCard);
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true); setValues({word: props.word, definition: props.definition, collection: props.currentCollection})};

    async function submitCard(){
        let collectionId = (props.collections.filter(item => {return item.name === values.collection}))[0].id;
        let newCard = {...values, collection: collectionId};
        try{
            await axios.put(`http://127.0.0.1:8000/flashcards/modify_card/${props.cardId}`, newCard);
            setSubmitted(true);
            setTimeout(() => {setShow(false); setSubmitted(false); props.selectCollection('none')}, 800);
        }
        catch(err){
            alert(err);
            return
        }
    }

    const generateCollectionOptions = (currentCollectionName) =>{
        let collectionNames = props.collections.map(item => {return item.name});
        collectionNames = collectionNames.filter(item => {return (item !== currentCollectionName)});
        let jsx = collectionNames.map(item => {return <option>{item}</option>});
        jsx.unshift(<option>{currentCollectionName}</option>);
        return jsx
    }

    return(
        <>
            <Button size='sm' variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Flashcard</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="word">
                            <Form.Label>Word</Form.Label>
                            <Form.Control type="text" name='word'onChange={handleChange} value={values.word} required={true}/>
                        </Form.Group>
                        <Form.Group controlId="definition">
                            <Form.Label>Definition</Form.Label>
                            <Form.Control type="text" name='definition' onChange={handleChange} value={values.definition} required={true}/>
                        </Form.Group>
                        <Form.Group controlId="definition">
                            <Form.Label>Collection</Form.Label>
                            <Form.Control as="select" name='collection' onChange={handleChange} value={values.currentCollection} required={true}>
                                {generateCollectionOptions(props.currentCollection)}
                            </Form.Control>
                        </Form.Group>
                        <div className='row'>
                            <div className='col-md-8 col-0'></div>
                            <Button variant="secondary" className='mr-2' onClick={handleClose}>
                                Close
                            </Button>
                            {submitted ? <h4 className='text-center'>Done!</h4> : <Button type='submit' variant="primary">Submit</Button>}  
                            
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditCardForm