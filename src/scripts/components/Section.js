
class Section {
  constructor({renderer, containerSelector}) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  createElement(items) {
    this.clear();
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(item, check) {
    if (check) {
      this._container.append(item);
    }
    else if (!check){
      this._container.prepend(item);
    }
  }
}

export default Section;
