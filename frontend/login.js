async function auth() {
  user = {
    userName: document.getElementById("uNameIn").value,
    password: document.getElementById("upasswordIn").value,
  };
  const fetchparams = {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  };
  const resp = await fetch("https://localhost:44387/api/Login/", fetchparams);
  let data = await resp.json();
  if (data == true) {
    window.location.href = "homepage.html";
  } else {
    alert("no such user");
  }
}
