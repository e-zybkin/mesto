
class Api {
  constructor({address, headers}) {
    this.address = address;
    this.headers = headers
  }

  getInitialCards() {
    return fetch(`${this.address}/cards`, {
      headers: this.headers,
    })
    .then(result => {
      if (result.ok) {
        return result.json();
      } else {
        return Promise.reject(`Ошибка: ${result.status}`)
      }
    })
  }

  getUserData() {
    return fetch(`${this.address}/users/me`, {
      headers: this.headers
    })
    .then(result => {
      if (result.ok) {
        return result.json();
      } else {
        return Promise.reject(`Ошибка: ${result.status}`)
      }
    })
  }

  // другие методы работы с API
}

export default Api;
