function App(storage) {
  let list = {};
  let shopCart = [];

  const localData = storage.read();
  if (localData && Array.isArray(localData)) {
    for (const data of localData) {
      list[data.name] = data.quantity;
      if (data.checked) {
        shopCart.push(data.name);
      }
    }
  }

  /**
   * Whether an item exists or not
   * @param {Item|string} item an instance of Item or a name
   * @returns {bool} true if the item is alrezdy on the list
   */
  doesExist = item => {
    let name = item;
    return !!list[name]; //cast en booleen strict
  };

  /**
   * Validate name format
   * @param {string} name item's name
   */
  validateName = name => {
    if (typeof name !== "string" || name === "") {
      const e = new Error(
        `Invalid parameter "${name}" [${typeof name}]. It must be a non empty string`
      );
      e.name = "InvalidParameter";
      throw e;
    }
  };

  /**
   * Add item in card
   * @param {string} name name of item to add to card
   */
  addToCart = name => {
    shopCart.push(name);
    storage.write(this.getItemsList());
  };

  /**
   * Remove item into card
   * @param {string} name name of item to remove into card
   */
  removeToCart = name => {
    shopCart = shopCart.filter(n => n !== name);
    storage.write(this.getItemsList());
  };

  /**
   * Get list of items or just item
   * @param {string} name name of item to get
   */
  this.getCartItems = name => {
    if (name === undefined) {
      return shopCart.slice();
    }
    return shopCart.includes(name);
  };

  this.toggleItem = name => {
    validateName(name);

    if (!doesExist(name)) return;

    if (this.getCartItems(name)) {
      removeToCart(name);
    } else {
      addToCart(name);
    }
  };

  /**
   * Add 1 to the quantity of an existing item
   * @param {string} name
   */
  this.addItem = name => {
    validateName(name);

    if (doesExist(name)) {
      list[name]++;
    } else {
      list[name] = 1;
    }
    storage.write(this.getItemsList());
  };

  /**
   * Romve 1 to the quantity of an existing item
   * @param {sting} name
   */
  this.removeItem = name => {
    validateName(name);

    if (doesExist(name)) {
      list[name]--;
      if (list[name] === 0) {
        this.deleteItem(name);
        return;
      }
    }
    storage.write(this.getItemsList());
  };

  /**
   * @returns {Array}
   */
  this.getItemsList = () => {
    const array = [];

    for (const key in list) {
      const value = list[key];
      array.push({
        name: key,
        quantity: value,
        checked: this.getCartItems(key)
      });
    }

    return array;
  };

  this.deleteItem = name => {
    if (this.getCartItems(name)) {
      removeToCart(name);
    }
    delete list[name];
    storage.write(this.getItemsList());
  };

  this.clear = function clear() {
    list = {};
    shopCart = [];
    storage.write(this.getItemsList());
  };

  this.getCompletion = () => {
    const items = this.getItemsList();
    return items.length ? (shopCart.length / items.length) * 100 : 0;
  };
}
