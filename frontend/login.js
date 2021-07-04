async function auth() {
  let uName = document.getElementById("uNameIn").value;
  let uPass = document.getElementById("upasswordIn").value;

  user = {
    userName: uName,
    password: uPass,
  };
  const fetchparams = {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  };
  const resp = await fetch("http://localhost:65180/api/Login/", fetchparams);
  let userId = await resp.json();
  if (userId > 0) {
    // TODO add a condition- don't pull if already pulled earlier today
    const resp2 = await fetch("http://localhost:65180/api/Login/" + userId);
    let user = await resp2.json();
    // sessionStorage.setItem("actionNum", actNum);

    sessionStorage.setItem("loggedIn", true);
    sessionStorage.setItem("fullName", user.fullName);
    sessionStorage.setItem("userName", user.userName);
    sessionStorage.setItem("numOfAcion", user.numOfAction);
    let key = getWithExpiry(user.userName + "actionNum");
    if (key == null || key > 0) {
      if (key == null) {
        document.getElementById("err").hidden = true;

        // if it's the first login this day, initilize to define action number
        setWithExpiry(user.userName + "actionNum", user.numOfAction);
      }

      window.location.href = "home/homepage.html";
    } else {
      console.log(getWithExpiry(user.userName + "actionNum"));
      document.getElementById("err").hidden = false;
    }
  } else {
    alert("no such user");
  }
}
