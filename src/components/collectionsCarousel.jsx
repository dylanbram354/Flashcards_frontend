import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddCardForm from './addCardForm'

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

    return(
        <React.Fragment>
            {collectionName ? 
            <div className='text-center'>
                <Button className='mt-4 mb-4' variant='outline-secondary' onClick={() => {setCollectionName(null); props.selectCollection('none')}}>Back to Collections</Button>
            </div>
            : 
            <div className='mt-4'>
                <h3 className='text-center'>Select a collection to view its cards.</h3>
                <Card className='text-center w-50' style={{marginLeft:'auto', marginRight:'auto'}}>
                    <div className='text-right mt-2 mr-2'>
                        <AddCardForm selectCollection={props.selectCollection} collectionId={props.collections[selectedIndex].id}/>
                    </div>
                    <Card.Body>
                        <div className='jumbotron'>
                            <Card.Title>{props.collections[selectedIndex].name}</Card.Title>
                            <p>{props.collections[selectedIndex].description}</p>
                        </div>
                        <div>
                            <div className='row mt-4'>
                                <div className='col-12 col-md'>
                                    <Button size='sm' onClick={() => goToPreviousCollection()}>Previous</Button>
                                </div>
                                <div className='col-12 col-md mt-2 mt-md-0 mb-2 mb-md-0'>
                                    <Button size='lg' variant='success' onClick={() => {props.selectCollection(props.collections[selectedIndex].id); 
                                        setCollectionName(props.collections[selectedIndex].name)}}>View Cards</Button>
                                </div>
                                <div className='col-12 col-md'>
                                    <Button size='sm' onClick={() => goToNextCollection()}>Next</Button>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div> 
            }
            {/* {collectionName ? <h3 className='text-center mt-4'>{collectionName} selected! <br /> Displaying cards:</h3> : ''} */}
        </React.Fragment>
    )
}

export default CollectionsCarousel