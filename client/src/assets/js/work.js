import "/client/node_modules/socket.io-client/dist/socket.io.min.js";

const URLparams = new URLSearchParams(window.location.search);
const name = URLparams.get("name") || null;
const userName = URLparams.get("username") || null;

document.querySelector(".current-user-username").textContent = userName;
document.querySelector(".current-user-name").textContent = name;
const socket = io("http://localhost:5000", {
  auth: { token: localStorage.getItem("token") },
  transports: ["websocket"],
});

/* socket.auth = JSON.parse(localStorage.getItem("user")).username;
 */

socket.on("chat message", (msg) => {
  let newMessageElement = createNewChatMessage(msg, true);
  chatContainer.insertAdjacentHTML("beforeend", newMessageElement);
  //scrollToBottomOfChatWindow();
});

function createNewChatMessage(msg, isMine) {
  let chatTemplate = `
    <div class="message-box ${isMine ? "my" : "friend"}-message">
        <p>${msg}</p>
    </div>
    `;
  return chatTemplate;
}

socket.on("connect_error", (err) => {
  if (err.message === "invalid username") {
    alert("Invalid Username");
  }
});

socket.on("users", (users) => {
  listAllUsers(users);
});

function listAllUsers(users) {
  debugger;
  let chatUserContainer = document.querySelector(".chat-users");
  console.log(users);
  users.forEach((user) => {
    if (!(user.userId === socket.id)) {
      let templeate = `
      <div class="flex h-20 hover:bg-slate-200  rounded-box place-items-center   p-3 "> 
      <div class="avatar mr-6 items-center">
        <div class="w-12 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div>
        <p class="text-white font-bold">${user.username}</p>
      </div>
    </div>
    <div class="divider  my-0"></div>  `;
      chatUserContainer.insertAdjacentHTML("beforeend", templeate);
    }
  });
}
