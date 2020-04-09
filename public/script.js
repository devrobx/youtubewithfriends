
  const form = document.getElementById('message-form');
  const submit = document.getElementById('submit');
  const messages = document.getElementById('messages');
  const input = document.getElementById('input');
  const socket = io();
  let path = window.location.pathname
  const roomParam = path.substring(1);

  


if(form != null){
  const user = prompt('What is your name?');
  const chatroom = roomParam;
  socket.emit('new-user',chatroom, user)


  //Emit new message
submit.addEventListener('click', e =>{
  e.preventDefault();
  const message = input.value;
  socket.emit('chatMessage', message);
  input.value = '';
});
}

// listen for messages from server
socket.on('message', (message) => {
    appendMessage(message)
  })


  

function appendMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">${message.text}</p>
  `
  messages.append(div)
}


function appendMessageClient(message){
  console.log(message)
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="text">${message.text}</p>`
  messages.append(div)

}




