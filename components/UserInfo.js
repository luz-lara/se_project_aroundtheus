export default class UserInfo{
    constructor({profileName,profileJob}){
        this._profileName= document.querySelector(profileName);
        this._profileJob=document.querySelector(profileJob);
    }
    getUserInfo(){
        return{
            name:this._profileName.textContext,
            job:this._profileJob.textContext,
        };

    }
    setUserInfo(userData){
        this._profileName=userData.name;
        this._profileJob.textContext=userData.description;
    }
}