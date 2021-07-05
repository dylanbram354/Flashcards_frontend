import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddCardForm from './addCardForm';
import axios from 'axios'

const CollectionsCarousel = (props) => {

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [collectionName, setCollectionName] = useState(null)

    let goToPreviousCollection = () => {
        let tempIndex = selectedIndex - 1;
        if (tempIndex < 0){
            tempIndex = props.collections.length-1
        }
        setSelectedIndex(tempIndex)
    }

    let goToNextCollection = () => {
        let tempIndex = selectedIndex + 1;
        if (tempIndex > props.collections.length-1){
            tempIndex = 0
        }
        setSelectedIndex(tempIndex)
    }

    let deleteCollection = async (id) => {
        if (window.confirm('Are you sure? All cards in this collection will be deleted.')){
            try{
                let response = await axios.delete(`http://127.0.0.1:8000/flashcards/collections/info/${id}`);
                console.log(response);
                setSelectedIndex(0);
                props.refresh();
            }
            catch(err){
                alert(err);
            }
        }
        else {return}
    }

    return(
        <React.Fragment>
            {collectionName ? 
            <div className='text-center'>
                <Button variant='outline-secondary' onClick={() => {setCollectionName(null); props.selectCollection('none')}}>Back to Collections</Button>
            </div>
            : 
            <React.Fragment>
                <div className='mt-4'>
                    <p className='text-center'>Select a collection to view its cards.</p>
                    <Card className='text-center w-50' style={{marginLeft:'auto', marginRight:'auto', maxHeight:'60vh'}}>
                        <div className='row text-muted' >
                            <div className='col text-left mt-2 ml-2'><p>{selectedIndex+1}/{props.collections.length}</p></div>
                            <div className='col text-right mt-2 mr-2'>
                                <AddCardForm selectCollection={props.selectCollection} collectionId={props.collections[selectedIndex].id} collection={props.collections[selectedIndex].name}/>
                            </div>
                        </div>
                        <Card.Body>
                            <div className='jumbotron'>
                                <Card.Title>{props.collections[selectedIndex].name}</Card.Title>
                                <p>{props.collections[selectedIndex].description}</p>
                            </div>
                            <div className='text-center'>
                                <Button size='lg' variant='success' onClick={() => {props.selectCollection(props.collections[selectedIndex].id); 
                                    setCollectionName(props.collections[selectedIndex].name)}}>Open Collection</Button>
                            </div>
                            <div className='text-center mt-2'>
                                <Button size='sm' variant='outline-danger' onClick={() => {deleteCollection(props.collections[selectedIndex].id)}}>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className='row mt-4'>
                    <div className='col text-right'>
                        <Button variant='outline-primary' size='lg' onClick={() => goToPreviousCollection()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                        </Button>
                    </div>
                    <div className='col text-left'>
                        <Button variant='outline-primary' size='lg' onClick={() => goToNextCollection()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                        </Button>
                    </div>
                </div>
            </React.Fragment>
            }
        </React.Fragment>
    )
}

export default CollectionsCarousel