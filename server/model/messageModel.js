const mongoose = require("mongoose")

var messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "message is required"],
      trim: true,
    },
    user: [],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "sender id is required"],
    },
  },
  { timestamps: true }
)

//Export the model
module.exports = mongoose.model("Message", messageSchema)
