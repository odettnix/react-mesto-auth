class Api {
  constructor( {baseUrl, headers}) { //прнимает ссылку и хеадерс
    this._baseUrl = baseUrl;
    this._headers = headers;

    this.__checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getUserInfo() {
    return fetch(this._baseUrl + `/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this.__checkResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + `/cards`, {
      method: 'Get',
      headers: this._headers, })
    .then(this.__checkResponse);
  }

  saveNewUserInfo(userInformaiton) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userInformaiton)
    })
      .then(this.__checkResponse);
  }

  saveNewUserAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)})
      .then(this.__checkResponse);
  }

  postNewCard(cardInformation) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardInformation)})
      .then(this.__checkResponse);
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
      })
      .then(this.__checkResponse);
  }

  putLikeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._headers,
      })
      .then(this.__checkResponse);
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this._headers,
      })
      .then(this.__checkResponse);
  }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
      authorization: '990eb1b4-940b-4d98-be8e-e780cfa06b2c',
      'Content-Type': 'application/json'
    }
});