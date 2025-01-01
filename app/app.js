const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server,{
        cors:{
            origin:'*',
        }
});

let Likes = 0;
io.on('connection',(socket)=>{
    socket.emit('likeupdate', Likes)
    socket.on('liked',()=>{
        Likes++
        socket.emit('likeupdate', Likes)
        socket.broadcast.emit('likeupdate',Likes)
    })
})
app.get('/',(req,res)=>{
    res.send('Hello Guy')
})

server.listen(3000)