
class Section {
  constructor({items, renderer, containerSelector}) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  createElement() {
    this.clear();
    this._renderedItems.forEach(item => {
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
