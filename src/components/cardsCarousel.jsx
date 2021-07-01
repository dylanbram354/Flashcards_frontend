import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios'

const CardsCarousel = (props) => {

    const [selectedCardIndex, setSelectedCardIndex] = useState(0)
    const [cards, setCards] = useState([])

    useEffect(() => {getCardsInCollection(props.collectionId)}, [props.collectionId])

    let getCardsInCollection = async () => {
        let response = await axios.get(`http://127.0.0.1:8000/flashcards/investigate_collection/${props.collectionId}`);
        setCards(response.data);
    }

    let goToPreviousCard = () => {
        let tempIndex = selectedCardIndex - 1;
        if (tempIndex < 0){
            tempIndex = cards.length-1
        }
        setSelectedCardIndex(tempIndex)
    }

    let goToNextCard = () => {
        let tempIndex = selectedCardIndex + 1;
        if (tempIndex > cards.length-1){
            tempIndex = 0
        }
        setSelectedCardIndex(tempIndex)
    }

    return(
        <React.Fragment>
            {cards.length > 0 ?
                <React.Fragment>
                    <div className='mt-4'>
                        <Card className='text-center w-50' style={{marginLeft:'auto', marginRight:'auto'}}>
                            <Card.Body>
                                <Card.Title>{cards[selectedCardIndex].word}</Card.Title>
                                <Card.Text>
                                    <Button onClick={()=>{alert('definition here')}}>View Definition</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className='row mt-4'>
                        <div className='col text-center'>
                            <Button onClick={() => goToPreviousCard()}>Previous Card</Button>
                        </div>
                        <div className='col text-center'>
                            <Button onClick={() => goToNextCard()}>Next Card</Button>
                        </div>
                    </div>
                </React.Fragment>
                : ''}
        </React.Fragment>
        
    )
}

export default CardsCarousel