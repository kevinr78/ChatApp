import "/client/node_modules/socket.io-client/dist/socket.io.min.js";

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
  console.log(users);
});
