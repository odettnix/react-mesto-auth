import React, {useState, useEffect} from 'react';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";

import { api } from '../utils/Api';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

function App() {

  const [isOpenAvatarPopup, setIsOpenAvatarPopup] = useState(false);
  const [isOpenProfilePopup, setIsOpenProfilePopup] = useState(false);
  const [isOpenPlacePopup, setIsOpenPlacePopup] = useState(false);
  const [isOpenConfimPopup, setIsOpenConfimPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isOpenCardPopup, setIsOpenCardPopup] = useState(false);
  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка получения данные: ${err}`);
      });
  }, []);

  function handleUpdateUser(value) {
    setIsLoading(true);
    api.saveNewUserInfo(value)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(`Ошибка обновеления профиля: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(value) {
    setIsLoading(true);
    api.saveNewUserAvatar(value)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(`Ошибка обвноления аватара: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddCard(value) {
    setIsLoading(true);
    api.postNewCard(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(`Ошибка добавления карточки: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api.putLikeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка добавления лайка: ${err}`);
        });
    } else {
      api.deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка удаления лайка: ${err}`);
        });
    }
  }



  function handleCardDelete(card) {
    setIsLoading(true);
    api.removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .then(closeAllPopups)
      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardClick(card) {
    setIsOpenCardPopup(true);
    setSelectedCard(card);
  }

  function handleConfimCardDelete(card) {
    setIsOpenConfimPopup(true);
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsOpenAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setIsOpenProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setIsOpenPlacePopup(true);
  }

  useEffect(() => {
    function handelEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    function handleClosePopups(evt) {
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close")
      ) {
        closeAllPopups();
      }
    }

    document.addEventListener("mousedown", handleClosePopups);
    document.addEventListener("keydown", handelEscape);

    return () => {
      document.removeEventListener("keydown", handelEscape);
      document.removeEventListener("mousedown", handleClosePopups);
    };
  }, []);

  function closeAllPopups() {
    setIsOpenProfilePopup(false);
    setIsOpenPlacePopup(false);
    setIsOpenAvatarPopup(false);
    setIsOpenCardPopup(false);
    setIsOpenConfimPopup(false);
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      <Header />
      <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onClickCardDelete={handleConfimCardDelete}
          onCardLike={handleCardLike}
        />
      <Footer />
      <EditProfilePopup
          isOpen={isOpenProfilePopup}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
        />
      <EditAvatarPopup
          isOpen={isOpenAvatarPopup}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
      />
        
      <AddPlacePopup
          isOpen={isOpenPlacePopup}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onAddCard={handleAddCard}
      />
      <ConfirmPopup
          isOpen={isOpenConfimPopup}
          onClose={closeAllPopups}
          onConfirmDeleteClick={handleCardDelete}
          card={selectedCard}
      />
      <ImagePopup isOpen={isOpenCardPopup} card={selectedCard} onClose={closeAllPopups}/>
    </div>
  </CurrentUserContext.Provider>
    
  );
}

export default App;
