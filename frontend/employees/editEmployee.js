function getEmpId() {
  let searchParams = new URLSearchParams(window.location.search);
  let empid = searchParams.get("empid");
  return empid;
}

async function loadData() {
  genHeader();
  let id = getEmpId();
  let found = await getEmployee(id);
  document.getElementById("id").value = found.ID;
  document.getElementById("fname").value = found.fName;
  document.getElementById("lname").value = found.lName;
  document.getElementById("date").value = found.startWorkYear;
  let resp = await getDepartments();
  document.getElementById("depCombo").value = found.departmentID;
}

async function getDepartments() {
  let resp = await fetch("http://localhost:65180/api/Department/");
  let data = await resp.json();
  data.forEach((dep) => {
    let optEl = document.createElement("option");
    optEl.value = dep.ID;
    optEl.innerText = dep.name;
    document.getElementById("depCombo").appendChild(optEl);
  });
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

async function editEmployee() {
  let id = getEmpId();
  let empToEdit = {
    ID: document.getElementById("id").value,
    fName: document.getElementById("fname").value,
    lName: document.getElementById("lname").value,
    startWorkYear: document.getElementById("date").value,
    departmentID: document.getElementById("depCombo").value,
  };

  const fetchparams = {
    method: "PUT",
    body: JSON.stringify(empToEdit),
    headers: { "Content-Type": "application/json" },
  };

  let resp = await fetch(
    "http://localhost:65180/api/Employee/" + id,
    fetchparams
  );
  let data = await resp.json();
  decActions();
  alert(data);
  // window.location.href = "employeesMain.html";
}
