const express = require("express")
const {
  register,
  login,
  setAvatar,
  getAllUser,
} = require("../controller/userController")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/setAvatar/:id", setAvatar)
router.get("/getAllUser/:id", getAllUser)

module.exports = router
