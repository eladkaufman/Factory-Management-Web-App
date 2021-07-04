async function getEmployees() {
  genHeader();
  const resp = await fetch("http://localhost:65180/api/Employee/");
  const data = await resp.json();
  buildTable(data);
}

function buildTable(data) {
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
      //changing the date format to local style
      let dateObj = new Date(shift.date);

      liEl.innerText = `${dateObj.toLocaleString().split(",")[0]}: ${
        shift.start_time
      } to ${shift.end_time}`;
      ulEl.appendChild(liEl);
    });
    let liLinkEl = document.createElement("li");
    let linkEl = document.createElement("a");
    linkEl.href = "addShiftToEmp.html?empid=" + emp.ID;
    linkEl.innerText = "Add shift";
    liLinkEl.appendChild(linkEl);
    ulEl.appendChild(liLinkEl);

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
      deleteEmpShifts(emp.ID);
      deleteEmployee(emp.ID);
      deleteRow(this);
      decActions();
    };

    delTdlEl.appendChild(delbutton);

    trEl.appendChild(delTdlEl);

    document.getElementById("tbl").appendChild(trEl);
  });
}

async function deleteEmpShifts(id) {
  const fetchparams = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const resp = await fetch(
    "http://localhost:65180/api/Shift/" + id,
    fetchparams
  );
  const data = resp.json();
  console.log(data);
}

async function deleteEmployee(id) {
  const fetchparams = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const resp = await fetch(
    "http://localhost:65180/api/Employee/" + id,
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

function searchEmployee() {
  const txtErr = "Type Somthing!";
  const fieldErr = "Please choose a search field";
  let searchField;
  let searchVal = document.getElementById("searchTxt").value;

  let radioValid = false;
  if (document.getElementById("fname").checked) {
    radioValid = true;
    searchField = document.getElementById("fname").value;
  } else if (document.getElementById("lname").checked) {
    radioValid = true;
    searchField = document.getElementById("lname").value;
  } else if (document.getElementById("dep").checked) {
    radioValid = true;
    searchField = document.getElementById("dep").value;
  }
  if (!radioValid || searchVal == "") {
    let alertMsg =
      !radioValid && searchVal == ""
        ? txtErr + "\n" + fieldErr
        : radioValid && searchVal == ""
        ? txtErr
        : fieldErr;
    alert(alertMsg);
  } else {
    sessionStorage.setItem("searchField", searchField);
    sessionStorage.setItem("searchVal", searchVal);
    window.location.href = "searchResults.html";
  }
}

async function getSearchRes() {
  genHeader();
  let field = sessionStorage.getItem("searchField");
  let val = sessionStorage.getItem("searchVal");

  const resp = await fetch("http://localhost:65180/api/Employee/");
  const data = await resp.json();
  let fData = [];
  data.forEach((emp) => {
    if (emp[field] == val) {
      fData.push(emp);
    }
  });
  console.table(fData);
  buildTable(fData);
  decActions();
}
