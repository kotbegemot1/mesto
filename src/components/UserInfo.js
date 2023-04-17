export default class UserInfo {
  constructor({ selectorName, selectorAbout, selectorAvatar }) {
   this._name = document.querySelector(selectorName);
   this._about = document.querySelector(selectorAbout);
   this._avatar = document.querySelector(selectorAvatar);
  //  console.log(typeof(this._avatar.src));
  }

  // showUserInfo() {
  //   console.log(this._name.textContent);
  //   console.log(this._about.textContent);
  // }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent
    }

    return userInfo
  }

  setUserInfo({name, about}) {
    this._name.textContent = name,
    this._about.textContent = about
  }

  updateAvatar = ({avatar}) => {
    // console.log(avatar);
    this._avatar.src = avatar;
  }
}
