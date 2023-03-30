export default class UserInfo {
  constructor({ selectorName, selectorDescription }) {
   this._name = document.querySelector(selectorName);
   this._description = document.querySelector(selectorDescription);
  }

  showUserInfo() {
    console.log(this._name.textContent);
    console.log(this._description.textContent);
  }

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
}
