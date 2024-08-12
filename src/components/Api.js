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
    getUserInfo() {
        return fetch("https://around-api.en.tripleten-services.com/v1/users/me",this._options)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        })
    }
}
