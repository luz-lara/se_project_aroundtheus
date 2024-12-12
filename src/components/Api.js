
export default class Api {
  constructor(options) {
    //constructor body
    this._options = options;
  }
  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", this._options
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
  }
  getUserInfo(){
    return fetch ("https://around-api.en.tripleten-services.com/v1/users/me",{
      method:"GET",
      headers:{
        authorization:"1a37d956-9fa4-4c51-a36f-94e001ed1e8f",
        "Content-Type": "application/json"
      }
    })
    .then(res =>{
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error:${res.status}`)
    })

}
  updateProfile(title, description) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "1a37d956-9fa4-4c51-a36f-94e001ed1e8f",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: title,
        about: description,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })

  }
  createNewCard(name, link) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "1a37d956-9fa4-4c51-a36f-94e001ed1e8f",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })

  }
  deleteCard(cardId) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "1a37d956-9fa4-4c51-a36f-94e001ed1e8f",
        "Content-Type": "application/json",
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
  }
  likeButtonActive(cardId) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: "1a37d956-9fa4-4c51-a36f-94e001ed1e8f",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isLiked: true
      })

    }
    )
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

    }
    )
  }
  profilePicture(avatarUrl) {
    return fetch(`https://around-api.en.tripleten-services.com/v1/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: "1a37d956-9fa4-4c51-a36f-94e001ed1e8f",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: avatarUrl
      })

    }
    )
  }
}
