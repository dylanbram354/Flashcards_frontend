import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import DefinitionModal from './definitionModal';
import EditCardForm from './editCardForm';

const CardsCarousel = (props) => {

    const [selectedCardIndex, setSelectedCardIndex] = useState(0)
    const [cards, setCards] = useState([])

    useEffect(() => {getCardsInCollection(props.collectionId)}, [props.collectionId])

    let getCardsInCollection = async (collectionId) => {
        let response = await axios.get(`http://127.0.0.1:8000/flashcards/investigate_collection/${collectionId}`);
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
                await axios.delete(`http://127.0.0.1:8000/flashcards/modify_card/${cardId}`);
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
                                <div className='row text-muted'>
                                    <div className='col text-left'>
                                        <p>({selectedCardIndex + 1}/{cards.length})</p>
                                    </div>
                                    <div className='col text-center'>
                                        <p>{props.collectionName}</p>
                                    </div>
                                    <div className='col-md' />
                                </div>
                                <div className='jumbotron'>
                                    <Card.Title><h3>{cards[selectedCardIndex].word}</h3></Card.Title>
                                    <Card.Text>
                                        <DefinitionModal word={cards[selectedCardIndex].word} definition={cards[selectedCardIndex].definition} />
                                    </Card.Text>
                                </div>
                                <div className='row'>
                                    <div className='col text-left'>
                                        <Button size='sm' variant='outline-danger' onClick={() => deleteCard(cards[selectedCardIndex].id)}>Delete</Button>
                                    </div>
                                    <div className='col text-right'>
                                        <EditCardForm selectCollection={props.selectCollection} currentCollection={props.collectionName} collections={props.collections} 
                                        word={cards[selectedCardIndex].word} definition={cards[selectedCardIndex].definition} cardId={cards[selectedCardIndex].id} />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className='row mt-4'>
                        <div className='col text-right'>
                            <Button variant='outline-primary' size='lg' onClick={() => goToPreviousCard()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                            </Button>
                        </div>
                        <div className='col text-left'>
                            <Button variant='outline-primary' size='lg' onClick={() => goToNextCard()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                            </Button>
                        </div>
                    </div>
                </React.Fragment>
                : <p className='text-center'>No cards in collection {props.collectionName}. Select a different collection or add a card.</p>}
        </React.Fragment>
        
    )
}

export default CardsCarousel