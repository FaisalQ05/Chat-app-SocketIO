const express = require("express")
const { addMessage, getMessage } = require("../controller/messageController")

const router = express.Router()

router.post("/add", addMessage)
router.post("/get", getMessage)

module.exports = router
