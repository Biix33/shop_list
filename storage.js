function Storage() {
  this.read = function() {
    return JSON.parse(localStorage.getItem("shoppingList"));
  };

  this.write = function(data) {
    localStorage.setItem("shoppingList", JSON.stringify(data));
  };
}
