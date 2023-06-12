const User = require("../model/userModel")
const { sendResponce, ErrorResponse } = require("../utils/response")
const { validateMongoDbId } = require("../utils/validateMongodbId")

const register = async (req, res) => {
  const { email } = req.body
  const user = await User.create(req.body)
  const userData = { ...user._doc }
  delete userData.password
  if (user) sendResponce(res, `User with ${email} created`, userData)
  else return res.json({ message: "Invalid user data received" })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!(email && password)) throw new Error("Email or Password Required")
  const findUser = await User.findOne({ email: email.toLowerCase() }).exec()
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const result = { ...findUser._doc }
    delete result.password
    sendResponce(res, "Login Successfully", result)
  } else {
    throw new Error("Invalid Credentials")
  }
}

const setAvatar = async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  const avatarImage = req.body.image
  if (!avatarImage) throw new Error("Please include url of avatar image")
  const userData = await User.findByIdAndUpdate(
    id,
    {
      isAvatarImageSet: true,
      avatarImage: avatarImage,
    },
    { new: true }
  ).lean()
  if (!userData) {
    throw new Error("No user found")
  }
  sendResponce(res, "Avatar image uploaded successfully", userData)
}

const getAllUser = async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  const users = await User.find({ _id: { $ne: id } })
    .select(["email", "username", "avatarImage"])
    .lean()
  if (users.length > 0) {
    sendResponce(res, "All Users fetched successfully", users)
  } else {
    sendResponce(res, "No user currently found", users)
  }
}

module.exports = { register, login, setAvatar, getAllUser }
