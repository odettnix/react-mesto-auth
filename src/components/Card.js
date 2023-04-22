import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from "react";

function Card ({card, onCardClick, onClickCardDelete, onCardLike}) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleCardClick() {
    onCardClick(card)
  } 

  function handleDeleteClick() {
    onClickCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && "elements__like-button_active"
  }`;

  return(
    <div className="cards-template">
        <li className="element" key={card.cardId}>
            <img className="elements__image" src={card.link} alt={card.name} onClick={handleCardClick} />
            <div className="elements__info">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <div className = "elements__like-counter">{card.likes.length}</div>
                </div>
            </div>
            {isOwn && (<button className="elements__button-remove" type="button" onClick={handleDeleteClick}></button>)}
        </li>
    </div>
  );
}
  
export default Card;