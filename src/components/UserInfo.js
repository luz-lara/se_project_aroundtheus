export default class UserInfo{
    constructor(nameSelector,jobSelector){
       this._nameEl = document.querySelector(nameSelector);
        this._jobEl=document.querySelector(jobSelector);
    }
    getUserInfo(){
        return{
            title:this._nameEl.textContent,
            job:this._jobEl.textContent,
            
        };
        
    }
    setUserInfo(title,description){
       this._nameEl.textContent=title
        this._jobEl.textContent=description
        
        //console.log(description);
        //profileTitle.textContent = profileTitleInput.value;
        //profileDescription.textContent = profileDescriptionInput.value;
    }
}