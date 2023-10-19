const chat = document.getElementById('chat');
const messageForm = document.getElementById('message-form');

messageForm.addEventListener('submit', function(e) {
    const chat = document.getElementById('chat');
    const aliasInput = document.getElementById('alias');
    const messageInput = document.getElementById('message');

    e.preventDefault();
    const alias = aliasInput.value;
    const message = messageInput.value;
    
    fetch('http://167.172.98.58/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alias: alias, message: message })
      })
      .then(console.log('Sent'))
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });

    messageInput.value = '';
    updateLastMessage(chat);
});
  
async function updateLastMessage(chat) {
    const response = await fetch('http://167.172.98.58/chats');
    const data = await response.json();
    const listItem = document.createElement('li');
    listItem.innerText = `${data.alias}: ${data.message}`;
    chat.appendChild(listItem);
  }

setInterval(updateLastMessage(),100)
