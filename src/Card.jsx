import React, { useEffect } from 'react';
import './Card.css';

const Card = ({ name, translation, description, onDone, flipped, setFlipped, showTranslationFirst }) => {
  
  useEffect(() => {
    setFlipped(false);
  }, [name, setFlipped]);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleDone = (e) => {
    e.stopPropagation();
    onDone();
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-front">
        <h3>{showTranslationFirst ? translation : name}</h3>
        {showTranslationFirst && <p>{description}</p>}
      </div>
      <div className="card-back">
        <h3>{showTranslationFirst ? name : translation}</h3>
        {!showTranslationFirst && <p>{description}</p>}
        <button className="done-button" onClick={handleDone}>Done</button>
      </div>
    </div>
  );
};

export default Card;
