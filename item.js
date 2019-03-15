function Item(name) {
  let _name;

  /**
   * Get item's name
   */
  this.getName = () => {
    return _name;
  };

  /**
   * Set the item's name
   * @param {string} name
   */
  this.setName = function setName(name) {
    if (typeof name !== "string" || name === "") {
      throw new Error(
        `Invalid parameter : "${name}" ${typeof name} must be an empty string value`
      );
    }

    _name = name;
  };

  this.setName(name);
}
