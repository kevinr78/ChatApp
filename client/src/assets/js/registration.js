const loginForm = document.querySelector("#login-form");
const signInForm = document.querySelector("#sign-in-form");
const loginButton = document.querySelector(".login-button");
const signInButton = document.querySelector(".sign-in-button");
const API_URL = "http://localhost:5000";

loginButton.addEventListener("click", loginUserToApp);
signInButton.addEventListener("click", signInUserToApp);

async function loginUserToApp(e) {
  e.preventDefault();
  let username, password, err;

  username = document.getElementById("login-username").value;
  password = document.getElementById("login-password").value;

  try {
    if (!username || !password) {
      err = new Error("PLease fill all details");
      throw err;
    }

    let loginRequest = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    let loginResponse = await loginRequest.json();

    if (!loginResponse.ok) {
      err = new Error(loginResponse.message);
      throw err;
    }
    console.log(loginResponse);
    localStorage.setItem("token", loginResponse.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: loginResponse.user.name,
        username: loginResponse.user.username,
      })
    );
    window.location.href = "http://127.0.0.1:5500/client/src/home.html";
  } catch (error) {
    console.log(error);
  }
}
async function signInUserToApp(e) {
  e.preventDefault();
  let fullName, username, password, err;
  fullName = document.getElementById("name").value;
  username = document.getElementById("sign-in-username").value;
  password = document.getElementById("sign-in-password").value;

  try {
    if (!fullName || !username || !password) {
      err = new Error("PLease fill all details");
      throw err;
    }

    let signInRequest = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify({ fullName, username, password }),
      headers: { "Content-Type": "application/json" },
    });

    let signInResponse = await signInRequest.json();

    if (!signInResponse.ok) {
      err = new Error(signInResponse.message);
      throw err;
    }
    alert("Account created!! login to get started");
    window.location.href = "http://127.0.0.1:5500/client/src/registration.html";
  } catch (error) {
    console.log(error);
  }
}
