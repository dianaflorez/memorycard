import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from '@mui/material/Button';
import './App.css';
import data from './data';
import useMediaQuery from '@mui/material/useMediaQuery';

const App = () => {
  const [index, setIndex] = useState(0);
  const [doneCards, setDoneCards] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showTranslationFirst, setShowTranslationFirst] = useState(false);
  const [showDoneList, setShowDoneList] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    const savedDoneCards = JSON.parse(localStorage.getItem('doneCards')) || [];
    setDoneCards(savedDoneCards);
  }, []);

  useEffect(() => {
    localStorage.setItem('doneCards', JSON.stringify(doneCards));
  }, [doneCards]);

  const handleDone = () => {
    setDoneCards([...doneCards, data[index]]);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const handleNext = () => {
    let nextIndex = (index + 1) % data.length;

    while (doneCards.includes(data[nextIndex])) {
      nextIndex = (nextIndex + 1) % data.length;
    }

    setIndex(nextIndex);
    setFlipped(false);
  };

  const handlePrev = () => {
    let prevIndex = index - 1;

    if (prevIndex < 0) {
      prevIndex = data.length - 1;
    }

    while (doneCards.includes(data[prevIndex])) {
      prevIndex = prevIndex - 1;
      if (prevIndex < 0) {
        prevIndex = data.length - 1;
      }
    }

    setIndex(prevIndex);
    setFlipped(false);
  };

  const toggleCardSide = () => {
    setShowTranslationFirst(!showTranslationFirst);
  };

  const toggleDoneList = () => {
    setShowDoneList(!showDoneList);
  };

  const handleRemoveFromDone = (word) => {
    setDoneCards(doneCards.filter(card => card !== word));
  };

  return (
    <div className="card-container">
      {showMessage && <div className="success-message">Guardada con éxito</div>}
      {index < data.length && !doneCards.includes(data[index]) ? (
        <Card
          name={data[index].name}
          translation={data[index].translation}
          description={data[index].description}
          onDone={handleDone}
          flipped={flipped}
          setFlipped={setFlipped}
          showTranslationFirst={showTranslationFirst}
        />
      ) : (
        <p>...</p>
      )}
<div
        className="button-group"
        style={{
          display: 'flex',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="contained"
          color="info"
          onClick={handlePrev}
          sx={{ flexBasis: isMobile ? '48%' : 'auto' }}
        >
          Preview
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          sx={{ flexBasis: isMobile ? '48%' : 'auto' }}
        >
          Next
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleCardSide}
          sx={{ flexBasis: isMobile ? '48%' : 'auto' }}
        >
          {showTranslationFirst ? 'Nombre Primero' : 'Traducción Primero'}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={toggleDoneList}
          sx={{ flexBasis: isMobile ? '48%' : 'auto' }}
        >
          {showDoneList ? 'Ocultar Lista' : 'Lista de Palabras'}
        </Button>
      </div>
      
      {showDoneList && (
        <div className="done-list">
          <h3>Palabras Marcadas como Done</h3>
          <ul>
            {doneCards.map((card, index) => (
              <li key={index}>
                <span className="word">{card.name} - {card.translation}</span>
                <span className="remove-button">
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleRemoveFromDone(card)}
                  sx={{ backgroundColor: '#fc9292' }}  // Aquí puedes definir el color de fondo
                >
                  Quitar
                </Button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
