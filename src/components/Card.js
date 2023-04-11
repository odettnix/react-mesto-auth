function Card ({card, onCardClick}) {

  function handleCardClick() {
    onCardClick(card)
  } 

  return(
    <div className="cards-template">
        <li className="element" key={card.cardId}>
            <img className="elements__image" src={card.cardImg} alt={card.cardName} onClick={handleCardClick} />
            <div className="elements__info">
                <h2 className="elements__title">{card.cardName}</h2>
                <div className="elements__like">
                    <button className="elements__like-button" type="button"></button>
                    <div className = "elements__like-counter">{card.cardLikes.length}</div>
                </div>
            </div>
            <button className="elements__button-remove" type="button"></button>
        </li>
    </div>
  );
}
  
    
  
  export default Card;