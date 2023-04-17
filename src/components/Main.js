import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main (props) {
    const currentUser = React.useContext(CurrentUserContext);

    return(
        <main className="content">
        <section className="profile">
            <div className="profile__avatar">
                <button onClick={props.onEditAvatar} className="profile__avatar-button" type="button"></button>
                <img className="profile__avatar-picture" id="profile__avatar" src={currentUser.avatar} alt="Фотография профиля" />
            </div>
            
            <div className="profile__info">
                <h1 className="profile__name" id="profile__name">{currentUser.name}</h1>
                <p className="profile__text" id="profile__text">{currentUser.about}</p>
                <button className="profile__edit-button" onClick={props.onEditProfile} id="profile__edit-button" type="button"></button>
            </div>
            <button onClick={props.onAddPlace} className="profile__add-button" type="button"></button>
        </section>

        <section className="elements">
            <ul className="elements__gallery">
            {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onClickCardDelete={props.onClickCardDelete}
              onConfirmClick={props.onConfirmClick}
              onCardLike={props.onCardLike}
            />
          ))}
            </ul>
        </section>
    </main>
    );
    
}
  
    
  
  export default Main;