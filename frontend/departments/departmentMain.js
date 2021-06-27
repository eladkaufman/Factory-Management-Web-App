async function getDepartments() {
  let resp = await fetch("https://localhost:44387/api/Department/");
  let data = await resp.json();
  data.forEach((dep) => {
    let idEl = document.createElement("td");
    let nameEl = document.createElement("td");
    let manEl = document.createElement("td");
    let trEl = document.createElement("tr");
    let delTdlEl = document.createElement("td");

    idEl.innerText = dep.ID;
    nameEl.innerText = dep.name;
    manEl.innerText = dep.manager;

    trEl.appendChild(idEl);
    trEl.appendChild(nameEl);
    trEl.appendChild(manEl);

    // Edit link
    let editTdEl = document.createElement("td");
    let editLinkEl = document.createElement("a");

    editLinkEl.innerText = "Edit";
    editLinkEl.href = "editDepartment.html?depid=" + dep.ID;

    editTdEl.appendChild(editLinkEl);
    trEl.appendChild(editTdEl);

    // Delete button
    if (dep.isEmpty) {
      let delbutton = document.createElement("input");
      delbutton.type = "button";
      delbutton.value = "Delete";

      delbutton.onclick = function () {
        deleteDepartment(dep.ID);
        deleteRow(this);
      };

      delTdlEl.appendChild(delbutton);
    }
    trEl.appendChild(delTdlEl);

    document.getElementById("tbl").appendChild(trEl);
  });
}

async function deleteDepartment(id) {
  const fetchparams = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  let resp = await fetch(
    "https://localhost:44387/api/Department/" + id,
    fetchparams
  );
  let data = await resp.json();

  return data;
}

function removeRow(rowId) {
  document.getElementById(rowId).remove;
}
function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}


