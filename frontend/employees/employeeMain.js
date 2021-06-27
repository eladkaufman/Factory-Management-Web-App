async function getEmployees() {
  const resp = await fetch("https://localhost:44387/api/Employee/");
  const data = await resp.json();
  data.forEach((emp) => {
    const idEl = document.createElement("td");
    const fnameEl = document.createElement("td");
    const lnameEl = document.createElement("td");
    const dateEl = document.createElement("td");
    const depEl = document.createElement("td");
    const manEl = document.createElement("td");
    const shitsEl = document.createElement("td");
    let editTdEl = document.createElement("td");
    const delTdlEl = document.createElement("td");
    const trEl = document.createElement("tr");

    idEl.innerText = emp.ID;
    fnameEl.innerText = emp.fName;
    lnameEl.innerText = emp.lName;
    dateEl.innerText = emp.startWorkYear;
    depEl.innerText = emp.departmentName;
    manEl.innerText = emp.isManager ? "Yes" : "No";
    // constructing shifts list
    const ulEl = document.createElement("ul");
    emp.shifts.forEach((shift) => {
      let liEl = document.createElement("li");
      liEl.innerText = `${shift.date}: ${shift.start_time} to ${shift.end_time}`;
      ulEl.appendChild(liEl);
    });
    shitsEl.appendChild(ulEl);
    trEl.appendChild(idEl);
    trEl.appendChild(fnameEl);
    trEl.appendChild(lnameEl);
    trEl.appendChild(dateEl);
    trEl.appendChild(depEl);
    trEl.appendChild(manEl);
    trEl.appendChild(shitsEl);

    // Edit link
    let editLinkEl = document.createElement("a");

    editLinkEl.innerText = "Edit";
    editLinkEl.href = "editEmployee.html?empid=" + emp.ID;

    editTdEl.appendChild(editLinkEl);
    trEl.appendChild(editTdEl);

    // Delete button

    let delbutton = document.createElement("input");
    delbutton.type = "button";
    delbutton.value = "Delete";

    delbutton.onclick = function () {
      deleteEmployee(emp.ID);
      deleteRow(this);
    };

    delTdlEl.appendChild(delbutton);

    trEl.appendChild(delTdlEl);

    document.getElementById("tbl").appendChild(trEl);
  });
}

async function deleteDepartment(id) {
  const fetchparams = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const resp = await fetch(
    "https://localhost:44387/api/Employee/" + id,
    fetchparams
  );
  const data = resp.json();
  return data;
}

function removeRow(rowId) {
  document.getElementById(rowId).remove;
}
function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
