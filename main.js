const app = new App(new Storage());

$(function() {
  const $list = $("#list-item");

  render($list);

  $("#add-item").on("submit", function(event) {
    event.preventDefault();

    const data = $("#item");

    try {
      // add item with strip html tags
      app.addItem(data.val().replace(/(<([^>]+)>)/gi, ""));
      render($list);
    } catch (err) {
      if (err.name === "InvalidParameter") {
        alert("Le nom est obligatoire !");
      } else {
        throw err;
      }
    }

    data.val("");
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

  $("#clearList").on("click", function() {
    app.clear();
    render($list);
  })
});

function createLi(item) {
  return /* html */ `<li class="list-group-item">
                <div class="row">
                  <div class="col-md-1">
                   <input type="checkbox" class="form-control" ${
                     item.checked ? "checked" : ""
                   } data-item="${item.name}">
                  </div>
                  <div class="col-md-8 ${
                    item.checked ? "item-name-checked" : ""
                  }">
                    ${item.name}
                  </div>
                  <div class="col-md-3">
                    <div class="btn-group mr-2">
                      <button type="button" class="btn btn-secondary" data-action="remove" data-item="${
                        item.name
                      }" ${item.checked ? "disabled" : ""}>-</button>
                      <button type="button" class="btn btn-secondary">${
                        item.quantity
                      }</button>
                      <button type="button" class="btn btn-secondary" data-action="add" data-item="${
                        item.name
                      }"  ${item.checked ? "disabled" : ""}>+</button>
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
  const completion = app.getCompletion();

  let html = "";

  for (const item of items) {
    html += createLi(item);
  }
  $list.html(html);

  let txt;
  let cls;

  if (!items.length) {
    txt = "Votre liste de courses est vide...";
    cls = "alert-light";
  } else if (completion == 0) {
    txt = "Les courses ne sont pas commencées !";
    cls = "alert-warning";
  } else if (completion === 100) {
    txt = "Les courses sont terminées !";
    cls = "alert-success";
  } else {
    txt = `Courses terminèes à ${completion.toFixed(2)}%`;
    cls = "alert-info";
  }

  $list
    .next()
    .attr("class", cls)
    .addClass("alert mt-2")
    .text(txt);
}
