import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetAllContact, host } from "../utils/ApiRoutes"
import useFetch from "../hooks/useFetch"
import Contact from "../components/Contact"
import ScreenLoading from "../components/common/ScreenLoading"
import Welcome from "../components/Welcome"
import ChatBox from "../components/ChatBox"
import { io } from "socket.io-client"
import { AiOutlineLogout } from "react-icons/ai"

const Chat = () => {
  const socket = useRef()
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(undefined)
  const [contacts, setcontacts] = useState([])
  const [apiResponse, apiCall] = useFetch(GetAllContact)
  const [currentChat, setCurrentChat] = useState(undefined)

  const getCurrentUser = async () => {
    setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
  }

  const onChangeChat = (user) => {
    setCurrentChat(user)
  }

  const handleLogout = async () => {
    localStorage.clear()
    navigate("/login")
  }

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login")
    } else {
      getCurrentUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        // console.log("avartar set")
        apiCall({}, currentUser._id, true)
      } else {
        navigate("setAvartar")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, navigate])

  useEffect(() => {
    if (apiResponse.isSuccess) {
      setcontacts(apiResponse.response?.result)
    }
  }, [apiResponse.isSuccess, apiResponse.response?.result])

  useEffect(() => {
    // console.log("current user")
    if (currentUser?._id) {
      // console.log("socket from")
      socket.current = io(host, { transports: ["websocket"] })
      socket.current.emit("add-user", currentUser._id)
    }
  }, [currentUser])

  return (
    <div className="from-[#ecf1f5eb] h-screen text-white via-[#94bfe889] to-gray-200 bg-gradient-to-b">
      <div
        id="chatContainer"
        className="lg:py-16   grid grid-rows-[10%_90%] max-w-7xl mx-auto h-full"
      >
        <div
          id="logo"
          className="flex items-center px-2 md:px-0 bg-[#1e3a51] lg:rounded-t-2xl lg:shadow-lg relative"
        >
          <div className="flex flex-col md:hidden">
            <img
              className="h-[2rem]"
              src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
              alt="avatar"
            />
            <p className="font-semibold">{currentUser?.username}</p>
          </div>
          <h1 className="font-bold text-3xl w-full text-center text-white">
            ChatConnect
          </h1>
          <div className="md:absolute md:right-2 md:top-[50%] md:translate-y-[-50%]">
            <AiOutlineLogout
              size={30}
              className="cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        </div>
        <div
          id="chatWrapper"
          className="bg-[#143047] lg:rounded-b-2xl md:shadow-lg grid grid-rows-[15%_85%] md:flex  md:flex-row"
        >
          <div
            id="contacts"
            className="basis-[10%] md:basis-[20%] flex justify-center items-center h-full"
          >
            {apiResponse.isSuccess ? (
              currentUser && (
                <Contact
                  contacts={contacts}
                  currentUser={currentUser}
                  onChangeChat={onChangeChat}
                />
              )
            ) : (
              <ScreenLoading />
            )}
          </div>
          <div
            id="chatBox"
            className="md:basis-[80%] basis-[90%] md:flex justify-center items-center h-full"
          >
            {apiResponse.isSuccess ? (
              currentUser &&
              (currentChat ? (
                <ChatBox
                  currentUser={currentUser}
                  currentChat={currentChat}
                  socket={socket}
                />
              ) : (
                <Welcome currentUser={currentUser} />
              ))
            ) : (
              <ScreenLoading />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
