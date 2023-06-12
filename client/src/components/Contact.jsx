/* eslint-disable react/prop-types */

import { useState } from "react"

// import { contacts as AllContacts } from "../constants/dummyData"
const Contact = ({ contacts, currentUser, onChangeChat }) => {
  const [selectedContact, setSelectedContact] = useState(null)

  const handleContactClick = (index, user) => {
    setSelectedContact(index)
    onChangeChat(user)
  }

  return (
    <div className="grid md:flex h-full w-full md:flex-col">
      <div className="flex md:flex-col overflow-x-auto overflow-y-auto h-full basis-[100%] md:basis-[80%] pr-[0.01rem]  gap-1 scrollbar md:scrollbar-thumb-gray-600 scrollbar-thumb-sky-900 scrollbar-track-inherit">
        {contacts.length > 0 ? (
          contacts.map((user, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center lg:gap-4 md:gap-1 lg:px-3 px-1 cursor-pointer ${
                  selectedContact === index ? "bg-[#295d87]" : "bg-[#1e3e58f3]"
                }`}
                onClick={() => handleContactClick(index, user)}
              >
                <img
                  className="h-[3rem] lg-h-[4rem] md:p-3 p-[0.2rem]"
                  src={`data:image/svg+xml;base64,${user.avatarImage}`}
                  alt="avatar"
                />
                <h4 className="font-semibold text-white">{user.username}</h4>
              </div>
            )
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <h5 className="font-semibold text-center">
              OOps No user available
            </h5>
          </div>
        )}
      </div>
      <div className="basis-[20%] md:flex justify-center items-center hidden">
        <div className="flex items-center gap-2">
          <img
            className="h-[4rem] lg-h-[5rem] p-2"
            src={`data:image/svg+xml;base64,${currentUser?.avatarImage}`}
            alt="avatar"
          />
          <h1 className="text-white font-bold lg:text-2xl text-xl">
            {currentUser?.username}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Contact
