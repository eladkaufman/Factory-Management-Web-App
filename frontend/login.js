async function auth() {
  document.getElementById("userErr").classList.add("hidden");
  document.getElementById("passErr").classList.add("hidden");

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
    const resp2 = await fetch("http://localhost:65180/api/Login/" + userId);
    let user = await resp2.json();

    if (user.password == uPass) {
      sessionStorage.setItem("loggedIn", true);
      sessionStorage.setItem("fullName", user.fullName);
      sessionStorage.setItem("userName", user.userName);
      sessionStorage.setItem("numOfAcion", user.numOfAction);
      let key = getWithExpiry(user.userName + "actionNum");
      if (key == null || key > 0) {
        if (key == null) {
          // if it's the first login this day, initilize to define action number
          setWithExpiry(user.userName + "actionNum", user.numOfAction);
        }

        window.location.href = "home/homepage.html";
      } else {
        // user exceeded action limit
        console.log(getWithExpiry(user.userName + "actionNum"));
        document.getElementById("exceedErr").hidden = false;
      }
    } else {
      // wrong password
      document.getElementById("passErr").classList.remove("hidden");
    }
  } else {
    // user doesn't exist
    console.log("no ex");
    document.getElementById("userErr").classList.remove("hidden");
  }
}
