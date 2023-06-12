/* eslint-disable react/prop-types */
import { Player } from "@lottiefiles/react-lottie-player"
import helloAnimation from "../assets/animation/hello.json"

const Welcome = ({ currentUser }) => {
  return (
    <div className="">
      <Player src={helloAnimation} className="md:h-72 h-48" loop autoplay />
      <div className="flex flex-col justify-center items-center gap-1">
        <h2 className="md:text-3xl text-2xl font-bold">
          Welcome{" "}
          <span className="text-blue-400 italic">{currentUser.username}</span>
        </h2>
        <p className="font-semibold text-sm md:text-base text-center">
          Please Select a chat to start messaging
        </p>
      </div>
    </div>
  )
}

export default Welcome
