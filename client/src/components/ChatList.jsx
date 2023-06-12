/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const ChatList = ({ chatData, scrollRef }) => {
  // console.log("All chats : ", chatData)
  return (
    <div className="self-stretch w-full h-full overflow-y-auto">
      <div className="md:flex flex-col h-full grid overflow-y-auto py-4 gap-4 px-5 scrollbar scrollbar-thumb-gray-400 scrollbar-track-inherit">
        {chatData?.map((chat, index) => {
          return (
            <div
              ref={scrollRef}
              className={`text-white font-semibold rounded-lg ${
                chat.self ? "self-end  bg-[#0b1728] md:ml-40 ml-16" : "self-start bg-[#295d87] md:mr-40 mr-16"
              }`}
              key={index}
            >
              <h1 className="p-2">{chat.message}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChatList
