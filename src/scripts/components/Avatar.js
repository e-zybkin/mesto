
class Avatar {
  constructor({avatarSelector}) {
    this._avatar = document.querySelector(avatarSelector);
  }

  setAvatar(formData) {
    this._avatar.src = formData.avatar;
  }
}

export default Avatar;
