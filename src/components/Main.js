import profileAvatar from '../images/Salem.jpg';
import React from "react";
import Card from "./Card";

function Main (props) {
    return(
        <main className="content">
        <section className="profile">
            <div className="profile__avatar">
                <button onClick={props.onEditAvatar} className="profile__avatar-button" type="button"></button>
                <img className="profile__avatar-picture" id="profile__avatar" src={props.userAvatar} alt="Фотография профиля" />
            </div>
            
            <div className="profile__info">
                <h1 className="profile__name" id="profile__name">{props.userName}</h1>
                <p className="profile__text" id="profile__text">{props.userDescription}</p>
                <button className="profile__edit-button" onClick={props.onEditProfile} id="profile__edit-button" type="button"></button>
            </div>
            <button onClick={props.onAddPlace} className="profile__add-button" type="button"></button>
        </section>

        <section className="elements">
            <ul className="elements__gallery">
                {props.cards.map((card) => (<Card key={card.cardId} card = {card} onCardClick={props.onCardClick}/>))}
            </ul>
        </section>
    </main>
    );
    
}
  
    
  
  export default Main;