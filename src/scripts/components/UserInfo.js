
class UserInfo {
  constructor({nameSelector, statusSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const obj = {
      name: this._name.textContent,
      status: this._status.textContent,
    }
    return obj;
  }

  getUserId(data) {
    const obj = data._id;
    return obj;
  }

  setUserInfo(formData) {
    this._name.textContent = formData.name;
    this._status.textContent = formData.about;
  }

  setAvatar(formData) {
    this._avatar.src = formData.avatar;
  }
}

export default UserInfo;
