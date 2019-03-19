const app = new App();

$(function() {
  const $list = $("#list-item");

  render($list);

  $("#add-item").on("submit", function(event) {
    event.preventDefault();

    const data = $("#item").val();

    try {
      app.addItem(data);
      // update list view
      render($list);
    } catch (err) {
      if (err.name === "InvalidParameter") {
        alert("Le nom est obligatoire !");
      } else {
        throw err;
      }
    }
  });

  $($list).on("click", "button", function(event) {
    const $target = $(event.currentTarget);
    const action = $target.data("action");
    const item = $target.data("item");

    if (!action) return;

    switch (action) {
      case "add":
        app.addItem(item);
        break;
      case "remove":
        app.removeItem(item);
        break;
      case "delete":
        app.deleteItem(item);
        break;
    }

    // app[`${action}Item`](name); same thing as the switch

    render($list);
  });

  $($list).on("click", 'input[type="checkbox"]', function(event) {
    const $target = $(event.currentTarget);
    const item = $target.data("item");

    if ($(this).prop("checked")) {
      app.toggleItem(item);
    } else {
      app.toggleItem(item);
    }
    render($list);
  });
});

function createLi(item) {
  return /* html */ `<li class="list-group-item">
                <div class="row">
                  <div class="col-md-1">
                   <input type="checkbox" class="form-control" ${
                     app.getCardItems(item.name) ? "checked" : ""
                   } data-item="${item.name}">
                  </div>
                  <div class="col-md-8 ${
                    app.getCardItems(item.name) ? "item-name-checked" : ""
                  }">
                    ${item.name}
                  </div>
                  <div class="col-md-3">
                    <div class="btn-group mr-2">
                      <button type="button" class="btn btn-secondary" data-action="remove" data-item="${
                        item.name
                      }" ${
    app.getCardItems(item.name) ? "disabled" : ""
  }>-</button>
                      <button type="button" class="btn btn-secondary">${
                        item.quantity
                      }</button>
                      <button type="button" class="btn btn-secondary" data-action="add" data-item="${
                        item.name
                      }"  ${
    app.getCardItems(item.name) ? "disabled" : ""
  }>+</button>
                    </div>
                    <div class="btn-group">
                      <button type="button" class="btn btn-secondary" data-action="delete" data-item="${
                        item.name
                      }">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </li>`;
}

function render($list) {
  const items = app.getItemsList();

  let html = "";

  for (const item of items) {
    html += createLi(item);
  }
  $list.html(html);
}
