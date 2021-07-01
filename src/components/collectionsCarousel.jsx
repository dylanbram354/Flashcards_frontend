import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

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
            <div className='mt-4'>
                <Card className='text-center w-50' style={{marginLeft:'auto', marginRight:'auto'}}>
                    <Card.Body>
                        <Card.Title>{props.collections[selectedIndex].name}</Card.Title>
                        <Card.Text>
                        {props.collections[selectedIndex].description}
                        <br/>
                        <br/>
                        <div className='row mt-4'>
                            <div className='col-12 col-md'>
                                <Button size='sm' onClick={() => goToPreviousCollection()}>Previous Collection</Button>
                            </div>
                            <div className='col-12 col-md mt-2 mt-md-0 mb-2 mb-md-0'>
                                <Button variant='success' onClick={() => {props.selectCollection(props.collections[selectedIndex].id); 
                                    setCollectionName(props.collections[selectedIndex].name)}}>Select</Button>
                            </div>
                            <div className='col-12 col-md'>
                                <Button size='sm' onClick={() => goToNextCollection()}>Next Collection</Button>
                            </div>
                        </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            {collectionName ? <h3 className='text-center mt-4'>{collectionName} selected!</h3> : ''}
        </React.Fragment>
    )
}

export default CollectionsCarousel