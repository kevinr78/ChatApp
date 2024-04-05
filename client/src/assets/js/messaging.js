import { socket } from "./initializeSocketConn.js";
import { chatWindowConfig } from "./initializeChatWindow.js";

const chatInput = document.querySelector(".chat-input");
const chatSendBtn = document.querySelector(".chat-input-send-btn");
const chatContainer = document.querySelector(".chat-message-container");
chatContainer.innerHTML = "";

function emitPrivateMessage() {
  let message = chatInput.value;

  if (!message) {
    return;
  }
  socket.emit("private message", {
    message,
    to: chatWindowConfig.chattingWithUser,
  });

  createAndAppendNewChatMessage(message, true);
}

socket.on("recieve private message", ({ message, from }) => {
  createAndAppendNewChatMessage(message, false);
});

chatSendBtn.addEventListener("click", emitPrivateMessage);

socket.on("chat message", (msg) => {
  let newMessageElement = createNewChatMessage(msg, true);
  chatContainer.insertAdjacentHTML("beforeend", newMessageElement);
  //scrollToBottomOfChatWindow();
});

socket.on("chat message", (msg) => {
  let newMessageElement = createNewChatMessage(msg, true);
  chatContainer.insertAdjacentHTML("beforeend", newMessageElement);
  //scrollToBottomOfChatWindow();
});

function createAndAppendNewChatMessage(msg, isMine) {
  let chatTemplsate = `
      <div class="message-box ${isMine ? "my" : "friend"}-message">
          <p>${msg}</p>
      </div>
      `;

  let chatTemplate = `
    <div class="chat ${isMine ? "chat-end" : "chat-start"}">
                <div class="chat-image avatar">
                  <div class="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <div class="chat-bubble">${msg}</div>
               
              </div>`;

  chatContainer.insertAdjacentHTML("beforeend", chatTemplate);
}
