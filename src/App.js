import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollectionsCarousel from './components/collectionsCarousel';
import CardsCarousel from './components/cardsCarousel';


function App() {

  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState('none')

  useEffect(() => {
    getCollections();
  }, [])

  let getCollections = async () => {
    try{
      let response = await axios.get('http://127.0.0.1:8000/flashcards/collections');
      if (response.data.length > 0){
        setCollections(response.data)
      }
      else{
        alert('No collections found!')
      }
    }
    catch (err){
      alert(err)
      return
    }
  }

  let getCollectionNameById = (id) => {
    let result = collections.filter((item) => {
      return (item.id === id);
    })
    return result[0].name
  }

  return (
    <div>
      <h1 className='text-center'>Welcome to the Flashcard App!</h1>
      {collections.length>0 ? 
      <div>
        <CollectionsCarousel collections={collections} selectCollection={setSelectedCollectionId}/>
      </div>
        :
        <p className='text-center'>Loading Collections...</p>}
      {selectedCollectionId !== 'none' ? 
        <CardsCarousel collections={collections} collectionId={selectedCollectionId} collectionName={getCollectionNameById(selectedCollectionId)} selectCollection={setSelectedCollectionId}/>
        :
        ''}
    </div>
  );
}

export default App;
