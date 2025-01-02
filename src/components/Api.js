
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);

  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  updateProfile(title, description) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: description,
      })
    })
      .then(this._checkResponse);

  }
  createNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse);

  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse);
  }
  likeButtonActive(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        isLiked: true
      })
    }).then(this._checkResponse);
  }

  likeButtonDeactive(cardId) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: "1a37d956-9fa4-4c51-a36f-94e001ed1e8f",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isLiked: false
      })
    }).then(this._checkResponse);
  }

  profilePicture(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl
      })
    }).then(this._checkResponse);
  }
}
