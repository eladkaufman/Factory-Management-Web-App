function getTimeToEndOfDay() {
  const now = new Date();
  let hours = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();

  const secInDay = 24 * 60 * 60;
  //   return time left in milliseconds
  return (secInDay - (hours * 60 * 60 + min * 60 + sec)) * 1000;
}

function setWithExpiry(key, value) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + getTimeToEndOfDay(),
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }
  //   console.log(" Now : " + now.getTime() + " & expiry is : " + item.expiry);
  return item.value;
}

function genHeader() {
  if (!sessionStorage.getItem("loggedIn")) {
    window.location.href = "login.html";
  }
  document.getElementById("cont")?.remove();

  const container = document.createElement("div");
  const ulEl = document.createElement("ul");
  const liBtnEl = document.createElement("li");
  const liNameEl = document.createElement("li");
  const liActEl = document.createElement("li");

  liBtnEl.setAttribute("style", "float: right;  padding: 8px;");
  liNameEl.setAttribute("style", "float: right;  padding: 8px;");
  liActEl.setAttribute("style", "float: right;  padding: 8px;");

  ulEl.setAttribute("style", "list-style-type:none;");
  container.setAttribute(
    "style",
    "border-bottom: 1px solid gray; background: #e6e2d3; width: 100%; height: 6vh;"
  );
  container.setAttribute("id", "cont");
  document.body.insertBefore(container, document.body.firstChild);

  const logOutBtn = document.createElement("button");
  logOutBtn.setAttribute("onclick", "logOut()");
  logOutBtn.innerText = "logout";
  liActEl.innerText =
    "Actions left : " +
    getWithExpiry(sessionStorage.getItem("userName") + "actionNum");
  // console.log(sessionStorage.getItem("userName"));

  liNameEl.innerText = sessionStorage.getItem("fullName");
  liBtnEl.appendChild(logOutBtn);
  ulEl.appendChild(liBtnEl);
  ulEl.appendChild(liActEl);
  ulEl.appendChild(liNameEl);
  container.appendChild(ulEl);
}

function decActions() {
  const key = sessionStorage.getItem("userName") + "actionNum";
  let curNum = getWithExpiry(key);
  alert("currNum = " + curNum);
  console.log(typeof curNum);
  if (curNum == 1) {
    // last action => Logout
    logOut();
  }
  if (curNum == null) {
    // it's a new day => init action to maximum
    setWithExpiry(key, sessionStorage.getItem("numOfAcion"));
  }

  // decrease
  const itemStr = localStorage.getItem(key);
  const item = JSON.parse(itemStr);
  item.value = curNum - 1;
  alert("item value = " + item.value);
  localStorage.setItem(key, JSON.stringify(item));

  // render header after update
  genHeader();
}

function logOut() {
  //clear user data from DOM and
  alert("logging out");
  sessionStorage.removeItem("fullName");
  sessionStorage.removeItem("userName");
  sessionStorage.removeItem("numOfAcion");
  sessionStorage.setItem("loggedIn", false);
  window.location.href = "../login.html";
  return false;
}
