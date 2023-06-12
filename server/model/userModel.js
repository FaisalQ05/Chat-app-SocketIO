const mongoose = require("mongoose") // Erase if already required
const bcrypt = require("bcrypt")
const crypto = require("crypto")
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (inputValue) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            inputValue
          )
        },
        message: "Invalid Email",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      validate: {
        validator: (inputValue) => {
          return /^(?=.*[A-Za-z0-9])(?!.*\s).{5,}$/.test(inputValue)
        },
        message: "Invalid Password . Password Should contains 5 characters",
      },
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(8)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// userSchema.pre("findOneAndUpdate", function (next) {
//   this.options.runValidators = true
//   next()
// })

//Export the model
module.exports = mongoose.model("User", userSchema)
