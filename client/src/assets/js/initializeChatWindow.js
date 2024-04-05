import { socket } from "./initializeSocketConn.js";

const chatWindowConfig = {
  currentChatWindow: null, //Private or Group Chat,
  chattingWithUser: null, //private chat user id
  groupRoomId: null,
};

socket.on("session", ({ sessionId, userId }) => {
  console.table({ sessionId, userId });
  socket.auth = { sessionId };
  socket.userId = userId;
  localStorage.setItem("session", sessionId);
});

socket.on("users", (users) => {
  listAllUsers(users);
});

function listAllUsers(users) {
  let chatUserContainer = document.querySelector(".chat-users");
  chatUserContainer.innerHTML = "";

  users.forEach((user) => {
    if (user.userID !== socket.id) {
      let templeate = `
        <div class="flex h-20 hover:bg-slate-200  rounded-box place-items-center p-3 chat-user-container " data-userId=${user.userID}> 
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

const chatUsersContainer = document.querySelector(".chat-users");
const currentChatuser = document.querySelector(".current-chat-username");

/* socket.auth = JSON.parse(localStorage.getItem("user")).username;
 */

chatUsersContainer.addEventListener("click", (e) => {
  let targetEle = e.target.closest(".chat-user-container");
  if (!targetEle) return;
  let name = targetEle.lastElementChild.firstElementChild.textContent;
  currentChatuser.innerText = name;
  chatWindowConfig.currentChatWindow = "private";

  chatWindowConfig.chattingWithUser = targetEle.dataset.userid;
});

export { chatWindowConfig };
