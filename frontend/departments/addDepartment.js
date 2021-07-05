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

  let resp = await fetch("http://localhost:65180/api/Department/", fetchparams);
  let data = await resp.json();
  if (data == "") {
    //department with the same name exist
    document.getElementById("nameErr").classList.remove("hidden");
  } else {
    decActions();
    window.location.href = "departmentMain.html";
  }
}
