export default class UserInfo {
  constructor({ selectorName, selectorDescription, selectorAvatar }) {
   this._name = document.querySelector(selectorName);
   this._description = document.querySelector(selectorDescription);
   this._avatar = document.querySelector(selectorAvatar);
   console.log(typeof(this._avatar.src));
  }

  // showUserInfo() {
  //   console.log(this._name.textContent);
  //   console.log(this._description.textContent);
  // }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      description: this._description.textContent
    }

    return userInfo
  }

  setUserInfo({name='Жак-Ив Кусто', description='Исследователь океана'}) {
    this._name.textContent = name,
    this._description.textContent = description
  }

  updateAvatar = (data) => {
    this._avatar.src = data.url;
  }
}
