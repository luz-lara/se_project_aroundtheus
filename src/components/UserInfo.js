export default class UserInfo {
    constructor(nameSelector, jobSelector,avatarSelector) {
        this._nameEl = document.querySelector(nameSelector);
        this._jobEl = document.querySelector(jobSelector);
        this._avatar=document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            title: this._nameEl.textContent,
            job: this._jobEl.textContent,
            avatar:this._avatar.src
        };

    }
    setUserInfo(title, description) {
        this._nameEl.textContent = title
        this._jobEl.textContent = description
        //this.setAvatar(avatar);
    }
    setAvatar(avatar) {
        this._avatar.src = avatar;
      }
}