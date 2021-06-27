function getEmpId() {
  let searchParams = new URLSearchParams(window.location.search);
  let empid = searchParams.get("empid");
  return empid;
}

async function loadData() {
  let id = getEmpId();
  let found = await getEmployee(id);
  document.getElementById("id").value = found.ID;
  document.getElementById("fname").value = found.fName;
  document.getElementById("lname").value = found.lName;
  document.getElementById("date").value = found.startWorkYear;
  document.getElementById("depCombo").value = found.departmentID;
}
async function getEmployee(id) {
  let resp = await fetch("https://localhost:44387/api/Employee/" + id);
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

// async function editDepartment() {
//   let id = getDepId();
//   let depToEdit = {
//     ID: document.getElementById("id").value,
//     name: document.getElementById("name").value,
//     manager: document.getElementById("man").value,
//   };

//   const fetchparams = {
//     method: "PUT",
//     body: JSON.stringify(depToEdit),
//     headers: { "Content-Type": "application/json" },
//   };

//   let resp = await fetch(
//     "https://localhost:44387/api/Department/" + id,
//     fetchparams
//   );
//   let data = await resp.json();
//   alert(data);
//   window.location.href = "department.html";
// }
