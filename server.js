const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = 8080

app.use('/static', express.static(path.join(__dirname, './build/static')))
app.get('*', function(req, res) {  
    res.sendFile(path.join( __dirname, './build/index.html'));
})

http.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})


let currentSockets = []
//socket transaction here
io.on('connection', function (socket) {
    console.log(`[LOG] - new socket is connected: ${socket.id}.`)

    currentSockets.push(socket.id)
    io.sockets.emit('server_send_current_sockets', currentSockets)

    socket.on('disconnect', function () {
        console.log(`[LOG] - socket ${socket.id} is disconnected.`)
        currentSockets = currentSockets.filter(id => id !== socket.id)
        socket.broadcast.emit('server_send_current_sockets', currentSockets)
    })
})