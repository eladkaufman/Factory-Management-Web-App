let rowId;

function getEmpId() {
  let searchParams = new URLSearchParams(window.location.search);
  let empid = searchParams.get("empid");
  return empid;
}

async function loadData() {
  genHeader();
  let id = getEmpId();
  let found = await getEmployee(id);

  document.getElementById("empName").innerText =
    found.fName + " " + found.lName;
  getShifts();
}

async function getEmployee(id) {
  let resp = await fetch("http://localhost:65180/api/Employee/" + id);
  let data = await resp.json();
  let emp = {
    ID: data.ID,
    fName: data.fName,
    lName: data.lName,
    startWorkYear: data.startWorkYear,
    departmentID: data.departmentID,
  };

  return emp;
}

async function getShifts() {
  const resp = await fetch("http://localhost:65180/api/Shift/");
  const data = await resp.json();
  data.forEach((shift) => {
    let dateTD = document.createElement("td");
    let dateObj = new Date(shift.date);
    dateTD.innerText = dateObj.toLocaleString().split(",")[0];

    let startTD = document.createElement("td");
    startTD.innerText = shift.start_time;
    let endTD = document.createElement("td");
    endTD.innerText = shift.end_time;
    let trEl = document.createElement("tr");
    trEl.id = shift.ID;
    trEl.appendChild(dateTD);
    trEl.appendChild(startTD);
    trEl.appendChild(endTD);
    document.getElementById("tbl").appendChild(trEl);
  });
  //add clicking function for selecting a shift

  let cells = document.getElementById("tbl").getElementsByTagName("td");

  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    cell.onclick = function () {
      rowId = this.parentNode.id;

      addShift();
    };
  }
}

async function addShift() {
  // Add a connection between the shift and the employee in the employeeShift table
  let empshft = {
    employeeID: getEmpId(),
    shiftID: rowId,
  };
  const fetchparams = {
    method: "POST",
    body: JSON.stringify(empshft),
    headers: { "Content-Type": "application/json" },
  };

  let resp = await fetch("http://localhost:65180/api/Employee/", fetchparams);
  let data = await resp.json();
  if (data == "") {
    //shift already assigned to this employee
    document.getElementById("dupErr").classList.remove("hidden");
  } else {
    decActions();
    window.location.href = "employeesMain.html";
  }
}
