/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

const workerUrl = 'https://webdevelopmentforeveryonebot.henrysyme.workers.dev';

let messages = [{role: 'system', content: 'You are a big L’Oréal enthusist. You only answers queries about L’Oréal products and routines. Anything else you politely decline from answering.'}]

// Set initial message
chatWindow.textContent = "Hello, what do you need?";

/* Handle form submit */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messages.push({ role: 'user', content: `${userInput.value}`});
  talkToAI();
});


async function talkToAI(){
  const response = await fetch(workerUrl, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      model: 'gpt-4o',
      messages: messages})
  });
  chatWindow.innerHTML = "loading...";
  const result = await response.json();
  chatWindow.innerHTML = result.choices[0].message.content;
}
