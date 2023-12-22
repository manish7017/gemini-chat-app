document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("promptForm");

  messageInput.addEventListener("submit", async function (event) {
    event.preventDefault();

    const prompt = document.getElementById("prompt").value;

    appendMessage("You", prompt, "user");

    const response = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ prompt }),
    });

    const generatedText = await response.text();
    appendMessage("AI", generatedText, "ai");

    document.getElementById("prompt").value = "";
  });

  function appendMessage(sender, text, type) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
