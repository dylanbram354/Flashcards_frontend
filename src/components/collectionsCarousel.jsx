import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

const CollectionsCarousel = (props) => {

    const [selectedIndex, setSelectedIndex] = useState(0)

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
        <div className='row' style={{height: '20vh'}}>
            <div className='col'>
                <Button onClick={() => goToPreviousCollection()}>Previous Collection</Button>
            </div>
            <Card style={{ maxWidth: '25%' }} className='col text-center'>
                <Card.Body>
                    <Card.Title>{props.collections[selectedIndex].name}</Card.Title>
                    <Card.Text>
                    {props.collections[selectedIndex].description}
                    </Card.Text>
                </Card.Body>
            </Card>
            <div className='col'>
                <Button onClick={() => goToNextCollection()}>Next Collection</Button>
            </div>
        </div>
    )
}

export default CollectionsCarousel