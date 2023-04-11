export default class Api {
    constructor({ baseUrl, headers }) {
      this._url = baseUrl;
      this._headers = headers;
  
  
      this._checkStatus = (res) => {
        if (res.ok) {
          return res.json();
        } 
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      }
    }
  
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers
      }).then(this._checkStatus)
    }
    
  
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers
      }).then(this._checkStatus)
    }
  
    saveNewUserInfo(name, about) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })})
        .then(this._checkStatus);
    }
  
  
    saveNewUserAvatar(avatar) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        })})
        .then(this._checkStatus);
    }
  
    createCard(cardData) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
        })
      }).then(this._checkStatus)
    }
  
    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(this._checkStatus)
    }
  
    likeCard(id, owner) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
        body: JSON.stringify({
          likes: [owner]
        })
      }).then(this._checkStatus)
    }
  
    dislikeCard(id, owner) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
        body: JSON.stringify({
          likes: [owner]
        })
      }).then(this._checkStatus)
    }
  }

  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
      authorization: '990eb1b4-940b-4d98-be8e-e780cfa06b2c',
      'Content-Type': 'application/json'
    }
  });