export default class Api {
  constructor({groupUrl, token}){
    // console.log(groupUrl, token);
    this._url = groupUrl;
    this._token = token;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(err))
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._checkResponse(res))
      .catch(err => console.log(err))
  };

  editUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(err))
  }

  addNewCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(err))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(err))
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(err))
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(err))
  }

  updateUserAvatar(link) {
    // console.log(avatar.avatar);
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link.avatar,
      })
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(err))
  }
}


