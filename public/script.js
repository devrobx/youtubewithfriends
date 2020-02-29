  const room = document.getElementById('room')
  const form = document.getElementById('message-form');
  const submit = document.getElementById('submit');
  const messages = document.getElementById('messages');
  const input = document.getElementById('input');
  const socket = io();


if(form != null){
  const user = prompt('What is your name?');
  appendMessage('You joined');
  const chatroom = room;
  socket.emit('new-user',chatroom, user)


  //Emit new message
submit.addEventListener('click', e =>{
  e.preventDefault();
  const message = input.value;
  appendMessage(`${message}`)
  socket.emit('updatechat', name, message);
  input.value = '';
});
}

// listen for messages from server
socket.on('updatechat', (user, message) => {
    appendMessage(`${user}: ${message}`)
  })

  socket.on('message', (user, message) => {
    appendMessage(`${user}: ${message}`)
  })

    
// socket.on('disconnect', (name) => {
//     appendMessage(`${name} has disconnected`)
//   })

socket.on('updateusers', usernames);

  



function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message;
  messages.append(messageElement)
}




// }