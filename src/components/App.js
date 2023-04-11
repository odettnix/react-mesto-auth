import React, {useState, useEffect} from 'react';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import { api } from '../utils/Api';

function App() {

  const [isOpenAvatarPopup, isEditAvatarPopupOpen] = useState(false);
  const [isOpenProfilePopup, isEditProfilePopupOpen] = useState(false);
  const [isOpenPlacePopup, isAddPlacePopupOpen] = useState(false);
  const [selectedCard, fixSelectedCard] = useState({});
  const [isOpenCardPopup, isOpenCardPopupOpen] = useState(false);

  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [cards, setCards] = useState([]);


  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about)
        setUserAvatar(user.avatar);
        setCards(cards.map((card) => ({
          cardId: card._id,
          cardName: card.name,
          cardImg: card.link,
          cardLikes: card.likes
        })));
      })
      .catch((err) => { 
        console.log(err);
      })
  }, [])

  function handleCardClick(card) {
    isOpenCardPopupOpen(true)
    fixSelectedCard(card)
  }

  function handleEditAvatarClick () {
    isEditAvatarPopupOpen(true)
  }
  
  function handleEditProfileClick () {
    isEditProfilePopupOpen(true)
  }
  
  function handleAddPlaceClick () {
    isAddPlacePopupOpen(true)
  }

  function closeAllPopups (evt) {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close")
      ) {
        isEditProfilePopupOpen(false);
        isAddPlacePopupOpen(false);
        isEditAvatarPopupOpen(false);
        isOpenCardPopupOpen(false)
      }
  }


  return (
    <div className="page">
      <Header />
      <Main  onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} userAvatar={userAvatar}
              userName={userName} userDescription={userDescription} cards={cards} />
      <Footer />
      <PopupWithForm name='profile' title={"Редактировать профиль"} buttonText={"Сохранить"} isOpen={isOpenProfilePopup} onClose={closeAllPopups}>
        <input className="popup__input popup__input_value-name" id="popup-input-name" name="popup__name" placeholder="Ваше имя" required minlength="2" maxlength="40" />
        <span className="popup__input-error popup-input-name-error"></span>
        <input className="popup__input popup__input_value-text" id="popup-input-text" name="popup__text" placeholder="О себе" required minlength="2" maxlength="200" />
        <span className="popup__input-error popup-input-text-error"></span>
      </PopupWithForm>
      <PopupWithForm name='avatar' title={"Обновить аватар"} buttonText={"Сохранить"} isOpen={isOpenAvatarPopup} onClose={closeAllPopups}>
        <input type="url" className="popup__input popup__input_value-avatar" id="popup-input-avatar" name="popup__avatar" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error popup-input-avatar-error"></span>
      </PopupWithForm>
      <PopupWithForm name='place' title={"Новое место"} buttonText={"Сохранить"} isOpen={isOpenPlacePopup} onClose={closeAllPopups}>
        <input type="text" className="popup__input popup__input_value-location" id="popup-input-location" name="popup__name" value="" placeholder="Название" required minlength="2" maxlength="30" />
        <span className="popup__input-error popup-input-location-error"></span>
        <input type="url" className="popup__input popup__input_value-url" id="popup-input-url" name="popup__text" value="" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error popup-input-url-error"></span>
      </PopupWithForm>
      <PopupWithForm name='confirm' title={"Вы уверенны?"} buttonText={"Да"}></PopupWithForm>
      <ImagePopup isOpen={isOpenCardPopup} card={selectedCard} onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
