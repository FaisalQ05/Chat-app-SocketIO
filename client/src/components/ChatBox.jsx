/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import { AddMessage, GetMessage } from "../utils/ApiRoutes"
import ChatInput from "./ChatInput"
import axios from "axios"
import ChatList from "./ChatList"
import ScreenLoading from "./common/ScreenLoading"

const ChatBox = ({ currentChat, currentUser, socket }) => {
  // console.log("chat box")
  // console.log(currentChat)
  // console.log(currentUser)
  const scrollRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [apiResponse, apiCall] = useFetch(AddMessage)
  const [chatData, setChatData] = useState(null)
  const [msg, setCurrentMsg] = useState({ msg: "" })
  const [arrivalMsg, setArrivalMsg] = useState(null)

  // console.log("currentUser : ",currentUser)
  // console.log("currentChat : ",currentChat)
  const handleSendMessage = (msg) => {
    // console.log("handle send message called")
    let options = {
      method: "POST",
      data: { message: msg, from: currentUser._id, to: currentChat._id },
      // withCredentials: true
    }
    apiCall(options)
    setCurrentMsg({ msg: msg })
  }

  const getMessageApi = async () => {
    setIsLoading(true)
    try {
      let options = {
        method: "POST",
        data: {
          from: currentUser._id,
          to: currentChat._id,
        },
        // withCredentials: true,
      }
      const response = await axios(GetMessage, options)
      setChatData(response.data.result)
      setIsLoading(false)
      setIsSuccess(true)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsSuccess(false)
    }
  }

  useEffect(() => {
    getMessageApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat])

  // console.log("apiResponse : ", apiResponse)
  // console.log("isSuccess : ", isSuccess)

  useEffect(() => {
    // console.log("in socket main")
    if (isSuccess && apiResponse.isSuccess) {
      // console.log("now sending to socket")
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        msg: msg.msg,
      })
      const msgs = [...chatData]
      msgs.push({ self: true, message: msg.msg })
      setChatData(msgs)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResponse.isSuccess, msg])

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        // console.log("emit called for  : ", currentUser?.username)
        // console.log("on recevie : ", msg)
        setArrivalMsg({ self: false, message: msg })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // console.log("arival message console : ", arrivalMsg)
    arrivalMsg && setChatData((prev) => [...prev, arrivalMsg])
  }, [arrivalMsg])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatData])

  return (
    <div className="self-stretch w-full h-full">
      <div className="grid grid-rows-[90%_10%] h-full">
        <div className="md:basis-[90%] md:flex md:justify-center md:items-center h-full grid">
          {isLoading ? (
            <ScreenLoading />
          ) : isSuccess ? (
            <ChatList chatData={chatData} scrollRef={scrollRef} />
          ) : (
            <ScreenLoading />
          )}
        </div>
        <div className="md:basis-[10%] h-full grid">
          <ChatInput handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  )
}

export default ChatBox
