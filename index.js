const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser')
const exphbs =require('express-handlebars');
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

const rooms = {}
const users = {}
let chatroom = '';

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req,res) => {
    res.render('index', {rooms: rooms});
});

app.post('/room', (req,res) => {
    console.log(`${req.body.room}`)
    const room = req.body.room
    chatroom = room;
    if(rooms[room] != null){
        return res.redirect(room);
    }
    rooms[room] = room
    console.log(JSON.stringify(rooms))
    res.redirect(room)
 
});

app.get('/:room' , (req,res) =>{
    // if(rooms[req.params.room] == null){
    //     return res.redirect('/')
    // }
    res.render('room', {roomName : req.params.room})

})


http.listen(port , ()=>{
    console.log(`Server running on port ${port}`)
});


//Chat-Room
io.on('connection', (socket) =>{
   
    socket.on('new-user', (room, name) =>{
        console.log(`${name} connected to ${chatroom}`)
        socket.username = name;

        socket.room = chatroom;
        users[name] = name;
        socket.join(room);
       socket.emit('updatechat', 'server', `you have joined '${chatroom}'`)
        socket.to(room).broadcast.emit('updatechat', 'server: ',  name + ' has connected to the chat')
        //socket.emit('updaterooms', rooms, room);
    })

 
    socket.on('updatechat', (user,message) =>{
        socket.broadcast.emit('updatechat', socket.username , message)
    })

    socket.on('disconnect', () => {
      
       io.sockets.emit('updateusers', users);
       socket.to(socket.room).broadcast.emit('updatechat', 'server: ', socket.username + ' has disconnected')
       delete users[socket.username];
       socket.leave(socket.room);
      })

   
})






