const { Server } = require('socket.io')
const Message = require('../models/Message')

module.exports = (server) => {
    // this will listen for client's request for handshake
    const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } })

    // after the handshake the connection will be trigger
    io.on('connection', (socket) => {
        socket.on('create-room', ({ yourId, otherId }) => {
            const roomId = [yourId, otherId].sort().join('_')
            socket.join(roomId)
        })

        socket.on('message', async ({yourId, otherId, message}) => { //will  listen to the message from the client
            const newMessage = new Message({ sender: yourId, receiver: otherId, message})
            await newMessage.save()
            
            const roomId = [yourId, otherId].sort().join('_')
            io.to(roomId).emit('message', newMessage) //sending back broadcast to the client
        })
    })
    // npm i socket.io (server)
    // npm i socket.io-client (client)
}