function App() {
  let list = {};

  /**
   * Whether an item exists or not
   * @param {Item|string} item an instance of Item or a name
   * @returns {bool} true if the item is alrezdy on the list
   */
  function doesExist(item) {
    let name = item;
    if (item instanceof Item) {
      name = item.getName();
    }
    return !!list[item]; //cast en booleen strict
  }

  /**
   * Create new item on the list
   * @param {string} name item's name
   */
  this.createItem = function createItem(name) {
    if (this.doesExist(name)) {
      addItem(nanme);
    } else {
      list[name] = 1;
    }
  };

  /**
   * Delete an item from the list
   * @param {string} name
   */
  this.deleteItem = function deleteItem(name) {
    delete list[name];
  };

  /**
   * Add 1 to the quantity of an existing item
   * @param {string} name
   */
  this.addItem = function addItem(name) {
    if (this.doesExist(name)) {
      list[name]++;
    } else {
      this.createItem(name);
    }
  };

  /**
   * Romve 1 to the quantity of an existing item
   * @param {sting} name
   */
  this.removeItem = function removeItem(name) {
    if (this.doesExist(name)) {
      list[name]--;
      if (list[name] === 0) {
        this.deleteItem(name);
      }
    }
  };

  /**
   * @returns {Array}
   */
  trhis.getItemList = function getItemList() {
    const array = [];

    for (const key in list) {
      const value = list[key];
      array.push({ name: key, quantity: value });
    }

    return array;
  };

  this.clear = function clear() {
    list = {};
  };
}
