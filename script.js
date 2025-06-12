const socket = io();
let nickname = "";

document.getElementById("start-chat").addEventListener("click", () => {
  const input = document.getElementById("nickname-input");
  if (input.value.trim() !== "") {
    nickname = input.value.trim();
    document.getElementById("nickname-screen").style.display = "none";
    document.getElementById("chat-screen").style.display = "block";
  }
});

const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  if (input.value && nickname) {
    socket.emit("chat message", { nickname, message: input.value });
    input.value = "";
  }
});

socket.on("chat message", function(data) {
  const item = document.createElement("div");
  item.textContent = `${data.nickname}: ${data.message}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});