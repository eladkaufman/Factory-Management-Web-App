async function getshifts() {
  genHeader();
  const resp = await fetch("http://localhost:65180/api/Shift/all/");
  const data = await resp.json();
  buildTable(data);
}

function buildTable(data) {
  data.forEach((shf) => {
    const idEl = document.createElement("td");
    const dateEl = document.createElement("td");
    const sTimeEl = document.createElement("td");
    const eTimeEl = document.createElement("td");
    const empEl = document.createElement("td");
    const ulEl = document.createElement("ul");
    const trEl = document.createElement("tr");

    idEl.innerText = shf.ID;

    let dateObj = new Date(shf.date);

    dateEl.innerText = `${dateObj.toLocaleString().split(",")[0]}`;
    sTimeEl.innerText = shf.start_time;
    eTimeEl.innerText = shf.end_time;

    shf.employees.forEach((emp) => {
      let liEl = document.createElement("li");
      let empLinkEl = document.createElement("a");

      empLinkEl.innerText = emp.fName + " " + emp.lName;
      empLinkEl.href = "../employees/editEmployee.html?empid=" + emp.ID;

      liEl.appendChild(empLinkEl);
      ulEl.appendChild(liEl);
      empEl.appendChild(ulEl);
    });

    trEl.appendChild(idEl);
    trEl.appendChild(dateEl);
    trEl.appendChild(sTimeEl);
    trEl.appendChild(eTimeEl);
    trEl.appendChild(empEl);

    document.getElementById("tbl").appendChild(trEl);
  });
}

async function addShift() {
  let newShift = {
    date: document.getElementById("date").value,
    start_time: document.getElementById("sTime").value,
    end_time: document.getElementById("eTime").value,
  };

  let fetchparams = {
    method: "POST",
    body: JSON.stringify(newShift),
    headers: { "Content-Type": "application/json" },
  };

  const resp = await fetch("http://localhost:65180/api/Shift", fetchparams);
  const data = await resp.json();

  decActions();
  alert(data);
  window.location.href = "shiftsMain.html";
}
