function getDepId() {
  let searchParams = new URLSearchParams(window.location.search);
  let depid = searchParams.get("depid");
  return depid;
}

async function getDepartment(id) {
  let resp = await fetch("http://localhost:65180/api/Department/" + id);
  let data = await resp.json();
  console.log(typeof toString(data.ID));
  let dep = {
    ID: data.ID,
    name: data.name,
    manager: data.manager,
  };

  return dep;
}

async function loadData() {
  genHeader();
  let id = getDepId();
  let found = await getDepartment(id);
  document.getElementById("id").value = found.ID;
  document.getElementById("name").value = found.name;
  document.getElementById("man").value = found.manager;
}

async function editDepartment() {
  let id = getDepId();
  let depToEdit = {
    ID: document.getElementById("id").value,
    name: document.getElementById("name").value,
    manager: document.getElementById("man").value,
  };

  const fetchparams = {
    method: "PUT",
    body: JSON.stringify(depToEdit),
    headers: { "Content-Type": "application/json" },
  };

  let resp = await fetch(
    "http://localhost:65180/api/Department/" + id,
    fetchparams
  );
  let data = await resp.json();
  decActions();
  alert(data);
  window.location.href = "departmentMain.html";
}
