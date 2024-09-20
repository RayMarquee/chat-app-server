require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
require('./configs/dbConnect')()
const userRouter = require('./routers/userRouter')
const socket = require('./socket/socket')
const messageRouter = require('./routers/messageRouter')

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'from server' })
})

app.use(userRouter)
app.use(messageRouter)


const server = app.listen(5000, () =>
    console.log('Server is listening on: http://localhost:5000'))

socket(server)