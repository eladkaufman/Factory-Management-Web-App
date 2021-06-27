async function addDepartment() {
  let depToadd = {
    name: document.getElementById("name").value,
    manager: document.getElementById("man").value,
  };

  fetchparams = {
    method: "POST",
    body: JSON.stringify(depToadd),
    headers: { "Content-Type": "application/json" },
  };

  let resp = await fetch(
    "https://localhost:44387/api/Department/",
    fetchparams
  );
  let data = await resp.json();
  alert(data);
  window.location.href = "department.html";
}
