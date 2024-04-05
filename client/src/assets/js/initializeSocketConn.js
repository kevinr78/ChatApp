import "/client/node_modules/socket.io-client/dist/socket.io.js";
const URLparams = new URLSearchParams(window.location.search);
const name = URLparams.get("name") || null;
const userName = URLparams.get("username") || null;

document.querySelector(".current-user-username").textContent = userName;
document.querySelector(".current-user-name").textContent = name;
const sessionId = localStorage.getItem("session") ?? null;

const socket = io("http://localhost:3000", {
  auth: { token: localStorage.getItem("token"), sessionId },
  transports: ["websocket"],
});

socket.on("connect_error", (err) => {
  if (err.message === "invalid username") {
    alert("Invalid Username");
  }
});

export { socket };
