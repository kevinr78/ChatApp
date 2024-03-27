import "/client/node_modules/socket.io-client/dist/socket.io.min.js";

const URLparams = new URLSearchParams(window.location.search);
const name = URLparams.get("name") || null;
const userName = URLparams.get("username") || null;
const users = [];

document.querySelector(".current-user-username").textContent = userName;
document.querySelector(".current-user-name").textContent = name;
const socket = io("http://localhost:3000", {
  auth: { token: userName },
  transports: ["websocket"],
});

const chatUsersContainer = document.querySelector(".chat-users");
const currentChatuser = document.querySelector(".current-chat-username");

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
  console.log(users);
  listAllUsers(users);
});

function listAllUsers(users) {
  let chatUserContainer = document.querySelector(".chat-users");
  chatUserContainer.innerHTML = "";

  users.forEach((user) => {
    if (user.userID !== socket.id) {
      console.log(socket.id);
      let templeate = `
      <div class="flex h-20 hover:bg-slate-200  rounded-box place-items-center p-3 chat-user-container data-user-id=${user.userID}"> 
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

chatUsersContainer.addEventListener("click", (e) => {
  let targetEle = e.target.closest(".chat-user-container");
  if (!targetEle) return;
  let name = targetEle.lastElementChild.firstElementChild.textContent;
  currentChatuser.innerText = name;
});
