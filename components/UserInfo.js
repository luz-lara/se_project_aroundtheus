export default class UserInfo{
    constructor(profileName,profileJob){
        this._profileName= document.querySelector(profileName);
        this._profileJob=document.querySelector(profileJob);
    }
    getUserInfo(){
        return{
            title:this._profileName.textContent,
            job:this._profileJob.textContent,
            
        };
        
    }
    setUserInfo(title,job){
        this._profileName.textContext=title;
        this._profileJob.textContext=job;
    }
}