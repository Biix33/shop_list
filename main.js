const myShoppingList = new App();

$(function() {
  //creat item
  $("#add-item").on("submit", function(event) {
    event.preventDefault();

    data = $("#item").val();
    $list = $("#list-item");

    myShoppingList.getItem(data);
    console.log(myShoppingList.getItemsList());

    $list.prepend(createLi(data));
  });
});

function createLi(item) {
  return `<li class="list-group-item">
                <div class="row">
                  <div class="col-md-9">
                    ${item}
                  </div>
                  <div class="col-md-3">
                    <div class="btn-group mr-2">
                      <button type="button" class="btn btn-secondary">-</button>
                      <button type="button" class="btn btn-secondary">1</button>
                      <button type="button" class="btn btn-secondary">+</button>
                    </div>
                    <div class="btn-group">
                      <button type="button" class="btn btn-secondary">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </li>`;
}
