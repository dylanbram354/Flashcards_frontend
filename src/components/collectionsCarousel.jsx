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
        <React.Fragment>
            <div className='mt-4'>
                <Card className='text-center w-50' style={{marginLeft:'auto', marginRight:'auto'}}>
                    <Card.Body>
                        <Card.Title>{props.collections[selectedIndex].name}</Card.Title>
                        <Card.Text>
                        {props.collections[selectedIndex].description}
                        <br/>
                        <br/>
                        <Button onClick={() => {props.selectCollection(props.collections[selectedIndex].id)}}>Select</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className='row mt-4'>
                <div className='col text-center'>
                    <Button onClick={() => goToPreviousCollection()}>Previous Collection</Button>
                </div>
                <div className='col text-center'>
                    <Button onClick={() => goToNextCollection()}>Next Collection</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CollectionsCarousel