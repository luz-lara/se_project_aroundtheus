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
    setUserInfo(name,description){
       this._nameEl.textContext=name;
        this._jobEl.textContext=description;
        console.log("listening")
        console.log(description);
        //profileTitle.textContent = profileTitleInput.value;
        //profileDescription.textContent = profileDescriptionInput.value;
    }
}