import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollectionsCarousel from './components/collectionsCarousel'


function App() {

  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null)

  useEffect(() => {
    
    getCollections();

  }, [selectedCollectionId])

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

  return (
    <div>
      <h1 className='text-center'>Welcome to the Flashcard App!</h1>
      {collections.length>0 ? 
      <CollectionsCarousel collections={collections}/>
      :
      <p className='text-center'>Loading Collections...</p>}
    </div>
  );
}

export default App;
