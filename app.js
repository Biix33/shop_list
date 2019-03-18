function App() {
  let list = {};
  const shopCard = [];

  /**
   * Whether an item exists or not
   * @param {Item|string} item an instance of Item or a name
   * @returns {bool} true if the item is alrezdy on the list
   */
  this.doesExist = function doesExist(item) {
    let name = item;
    if (item instanceof Item) {
      name = item.getName();
    }
    return !!list[name]; //cast en booleen strict
  };

  /**
   * Validate name format
   * @param {string} name item's name
   */
  function validateName(name) {
    if (typeof name !== "string" || name === "") {
      const e = new Error(
        `Invalid parameter "${name}" [${typeof name}]. It must be a non empty string`
      );
      e.name = "InvalidParameter";
      throw e;
    }
  }

  /**
   * Add 1 to the quantity of an existing item
   * @param {string} name
   */
  this.addItem = function addItem(name) {
    validateName(name);

    if (this.doesExist(name)) {
      list[name]++;
    } else {
      list[name] = 1;
    }
    // return list[name];
  };

  /**
   * Romve 1 to the quantity of an existing item
   * @param {sting} name
   */
  this.removeItem = function removeItem(name) {
    validateName(name);

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
  this.getItemsList = function getItemsList() {
    const array = [];

    for (const key in list) {
      const value = list[key];
      array.push({ name: key, quantity: value });
    }

    return array;
  };

  this.deleteItem = name => {
    delete list[name];
  };

  this.clear = function clear() {
    list = {};
  };
}
