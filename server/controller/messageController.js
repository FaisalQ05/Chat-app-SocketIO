const Message = require("../model/messageModel")
const { sendResponce } = require("../utils/response")
const { validateMongoDbId } = require("../utils/validateMongodbId")

const addMessage = async (req, res) => {
  const { from, to, message } = req.body
  if (!from) {
    throw new Error("sender id ( from ) required")
  }
  if (!to) {
    throw new Error("receiver id ( to ) required")
  }
  validateMongoDbId(from)
  validateMongoDbId(to)
  const sendMessage = await Message.create({
    message,
    user: [from, to],
    sender: from,
  })
  if (sendMessage) {
    sendResponce(res, "Message sended successfully", sendMessage)
  } else {
    throw new Error("Failed to send message")
  }
}

const getMessage = async (req, res) => {
  const { from, to } = req.body
  if (!(from && to)) {
    throw new Error("Please add sender and receiver id")
  }
  const messages = await Message.find({ user: { $all: [from, to] } })
    .sort({
      updatedAt: 1,
    })
    .lean()
    .exec()
  const projectMessages = messages.map((msg) => {
    return { self: msg.sender.toString() === from, message: msg.message }
  })
  sendResponce(res, "message fetched successfully", projectMessages)
}

module.exports = { addMessage, getMessage }
