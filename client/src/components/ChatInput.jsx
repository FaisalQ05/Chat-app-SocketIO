/* eslint-disable react/prop-types */
import { useState } from "react"
import EmojiPicker from "emoji-picker-react"
import { AiOutlineSend } from "react-icons/ai"
import { BsFillEmojiSmileFill } from "react-icons/bs"

const ChatInput = ({ handleSendMessage }) => {
  const [message, setMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const handleShowEmojiPicker = () => {
    setShowEmojiPicker((state) => !state)
  }

  const handleEmojiClick = (emoji) => {
    let msg = message
    msg += emoji.emoji
    setMessage(msg)
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const onSubmitMessage = () => {
    if (message.length > 0) {
      handleSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (message.length > 0) {
        handleSendMessage(message)
        setMessage("")
      }
    }
  }

  return (
    <div className="h-full">
      <div className="flex gap-4 h-full items-center p-2 relative">
        <div className="absolute bottom-[3.05rem]">
          {showEmojiPicker ? (
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          ) : (
            ""
          )}
        </div>
        <div className="cursor-pointer" onClick={handleShowEmojiPicker}>
          <BsFillEmojiSmileFill size={23} className="text-yellow-300" />
        </div>
        <div className="h-full w-full relative">
          <input
            className="h-full w-full px-4 pr-12 rounded-lg focus:outline-none text-black tracking-wide font-semibold bg-[#b0bbc4]"
            value={message}
            name="message"
            onClick={() => setShowEmojiPicker(false)}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <AiOutlineSend
            size={30}
            className="absolute cursor-pointer top-[50%] right-1 text-gray-900 translate-y-[-50%]"
            onClick={onSubmitMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatInput
