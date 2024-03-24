const socket = io("http://localhost:5000", { transports: ["websocket"] });

console.log(socket);
const chatInput = document.querySelector("#chat-message-input");
const chatContainer = document.querySelector(".chat-container");

chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" || event.which === 13) {
    socket.emit("chat message", chatInput.value);
    chatInput.value = "";
    console.log(socket.id);
  }
});

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
