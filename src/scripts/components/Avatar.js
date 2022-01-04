
class Avatar {
  constructor({avatarSelector}) {
    this._avatar = document.querySelector(avatarSelector);
  }

  setAvatar(formData) {
    this._avatar.src = formData.link;
  }
}

export default Avatar;
