const auth = document.getElementById("auth");
const chatApp = document.getElementById("chatApp");
const messages = document.getElementById("messages");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const sendBtn = document.getElementById("sendBtn");

if (localStorage.getItem("anonymo_user")) showChat();

loginBtn.onclick = () => {
  const u = username.value.trim();
  const p = password.value.trim();
  if (!u || !p) return alert("Fill the damn fields 💀");
  localStorage.setItem("anonymo_user", u);
  showChat();
};

logoutBtn.onclick = () => {
  localStorage.removeItem("anonymo_user");
  location.reload();
};

function showChat() {
  auth.style.display = "none";
  chatApp.style.display = "flex";
}

function addMsg(text, cls) {
  const div = document.createElement("div");
  div.className = `msg ${cls}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

sendBtn.onclick = sendMessage;

async function sendMessage() {
  const text = prompt.value.trim();
  if (!text) return;

  addMsg(text, "user");
  prompt.value = "";

  addMsg("Thinking…", "bot");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  messages.lastChild.remove();
  addMsg(data.reply || "AI died 💀", "bot");
}
