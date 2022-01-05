
class UserInfo {
  constructor({nameSelector, statusSelector}) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector);
  }

  getUserInfo() {
    const obj = {
      name: this._name.textContent,
      status: this._status.textContent,
    }
    return obj;
  }

  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._status.textContent = formData.about;
  }
}

export default UserInfo;
