const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser')
const exphbs =require('express-handlebars');
const io = require('socket.io')(http);
const cors = require('cors')
require('dotenv').config()
const formatMessage = require('./helpers/messages');
const  {
    joinUser,
    getCurrentUser,
    getUsersInRoom,
    removeUser
    
} = require('./helpers/users')

const port = process.env.PORT || 5000;
const bot = 'chatBot'


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req,res) => {
    res.render('index');
});

app.post('/room', (req,res) => {
    console.log(`${req.body.room}`)
    const room = req.body.room
    res.redirect(room)
 
});

app.get('/:room' , (req,res) =>{
    res.render('room', {roomName : req.params.room})
})


http.listen(port , ()=>{
    console.log(`Server running on port ${port}`)
});


//Chat-Room
io.on('connection', (socket) => {
   
    socket.on('new-user', (room, name) =>{
        console.log('connected')
        const user = joinUser(socket.id, name, room);
        console.log(`${user.name} connected to room ${user.room}`)
        socket.join(user.room);

       //Welcome new user 
        socket.emit('message', formatMessage(bot , `Welcome to the ${user.room} chat`));
       
        socket.broadcast.to(user.room).emit('message', formatMessage(bot, `${user.name} has joined the chat`))

        //Send list of people in room
        // io.to(user.room).emit('roomUsers', {
        //     room:user.room,
        //     users: getUsersInRoom(user.room)
        // })

       
    })

    //Listen for chat messages
    socket.on('chatMessage', (message) =>{
        const user = getCurrentUser(socket.id)

        io.to(user.room).emit('message', formatMessage(user.name , message))
    })

    socket.on('disconnect', (room) => {
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', formatMessage(bot, `${user.name} has left the chat`))
        }
        
        // io.to(user.room).emit('roomUsers', {
        //     room:user.room,
        //     users: getUsersInRoom(user.room)
        // })
    })

})




