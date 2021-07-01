import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const CardsCarousel = (props) => {

    const [selectedCardIndex, setSelectedCardIndex] = useState(0)
    const [cards, setCards] = useState([])

    useEffect(() => {getCardsInCollection(props.collectionId)}, [props.collectionId])

    let getCardsInCollection = async (collectionId) => {
        let response = await axios.get(`http://127.0.0.1:8000/flashcards/investigate_collection/${collectionId}`);
        console.log(response.data)
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

    let deleteCard = async (cardId) => {
        if (window.confirm('Are you sure you want to delete?')){
            try{
                let response = await axios.delete(`http://127.0.0.1:8000/flashcards/modify_card/${cardId}`);
                goToNextCard();
                await getCardsInCollection(props.collectionId);
            }
            catch(err){
                alert(err)
                return
            }
        }
        else{return}
    }

    return(
        <React.Fragment>
            {cards.length > 0 ?
                <React.Fragment>
                    <div className='mt-4'>
                        <Card className='text-center w-50' style={{marginLeft:'auto', marginRight:'auto'}}>
                            <Card.Body>
                                <div className='row'>
                                    <div className='col text-left'>
                                        <p>{props.collectionName} ({selectedCardIndex + 1}/{cards.length})</p>
                                    </div>
                                    <div className='col text-right'>
                                        <Button size='sm' variant='warning' onClick={() => alert('edit')}>Edit Card</Button>
                                    </div>
                                </div>
                                <div className='jumbotron'>
                                    <Card.Title><h1>{cards[selectedCardIndex].word}</h1></Card.Title>
                                    <Card.Text>
                                        <Button variant='success' onClick={()=>{alert(cards[selectedCardIndex].definition)}}>View Definition</Button>
                                    </Card.Text>
                                </div>
                                <div className='row'>
                                    <div className='col text-left'>
                                    </div>
                                    <div className='col text-right'>
                                        <Button variant='danger' onClick={() => deleteCard(cards[selectedCardIndex].id)}>Delete Card</Button>
                                    </div>
                                </div>
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
                : <p className='text-center'>No cards in collection {props.collectionName}. Select a different collection or add a card.</p>}
        </React.Fragment>
        
    )
}

export default CardsCarousel