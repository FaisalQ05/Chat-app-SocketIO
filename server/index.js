require("dotenv").config()
require("express-async-errors")
const http = require("http")
const express = require("express")
const { default: mongoose } = require("mongoose")
const cors = require("cors")
const socket = require("socket.io")

const userRouter = require("./routes/userRoute")
const messageRouter = require("./routes/messageRoute")

const connectDB = require("./config/dbConnect")
const corsOptions = require("./config/corsOptions")
const { errorHandler } = require("./middleware/errorHandler")
const { logger } = require("./middleware/logger")
const allowedOrigins = require("./config/allowedOrigin")

const app = express()
const server = http.createServer(app)
const io = socket(server, {
  cors: { origin: "https://chat-connect.netlify.app" },
})

const PORT = process.env.PORT || 4000
connectDB()

app.use(cors({ origin: "https://chat-connect.netlify.app" }))
app.use(express.json())

console.log(process.env.NODE_ENV)

app.use(logger)

//routes

app.use("/api/user", userRouter)
app.use("/api/message", messageRouter)

app.all("*", (req, res) => {
  res.status(404)
  res.json("404 not found")
})

app.use(errorHandler)

//If connection open once
mongoose.connection.once("open", () => {
  console.log("Databse connected successfully")
})

//When mongos throw an error
mongoose.connection.on("error", (err) => {
  logEvents(
    `${err.no}: ${err.code}\t${err.codeName}\t${err.hostname}`,
    "dbConnectionError.log"
  )
  console.log("Mongoose Error : ", err)
})

// const io = socket(server, {
//   cors: {
//     origin: allowedOrigins[0],
//     Credential: true,
//   },
// })

global.onlineUsers = new Map()

io.on("connection", (socket) => {
  // global.chatSocket = socket
  socket.on("add-user", (userId) => {
    // console.log(socket)
    // console.log("Socket called : ", userId)
    onlineUsers.set(userId, socket.id)
  })
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg)
    }
  })
})


server.listen(PORT, () => {
  console.log(`Server is runing on PORT ${PORT}`)
})