import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Buffer } from "buffer"
import Loading from "../components/common/Loading"
import useFetch from "../hooks/useFetch"
import { SetAvatarRoute } from "../utils/ApiRoutes"

const SetAvatar = () => {
  const url = "https://api.multiavatar.com/45678945"
  const navigate = useNavigate()
  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)
  const [message, setMessage] = useState("")

  const [apiResponse, apiCall] = useFetch(SetAvatarRoute)

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      setMessage("Please select an avatar")
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"))

      const options = {
        method: "POST",
        data: { image: avatars[selectedAvatar] },
        // withCredentials: true,
      }
      apiCall(options, user._id, true)
    }
  }

  useEffect(() => {
    const fetchData = async (url) => {
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

    const callAvartarApi = () => {
      return new Promise((resolve, reject) => {
        let PromisesData = []
        for (let i = 0; i < 4; i++) {
          const response = fetchData(
            `${url}/${Math.round(Math.random() * 1000)}?apikey=trKUaPeMiAGJvD`
          )
          PromisesData.push(response)
        }
        Promise.all(PromisesData)
          .then((data) => {
            let avartarData = []
            for (let item of data) {
              const buffer = Buffer.from(item.data)
              avartarData.push(buffer.toString("base64"))
            }
            resolve(avartarData)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

    callAvartarApi()
      .then((data) => {
        setAvatars(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error : ", error)
      })
  }, [])

  console.log(apiResponse)

  useEffect(() => {
    if (apiResponse?.response?.success) {
      localStorage.setItem(
        "chat-app-user",
        JSON.stringify(apiResponse?.response?.result)
      )
      navigate("/")
    }
  }, [
    apiResponse.isSuccess,
    apiResponse?.response?.result,
    apiResponse?.response?.success,
    navigate,
  ])

  return (
    <div className="h-screen bg-[#143047] flex w-full justify-center items-center flex-col gap-[1rem] md:gap-[2rem] lg:gap-[3rem]">
      <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
        Pick an avatar
      </h1>
      <div className="flex gap-[0.6rem] md:gap-[2rem] text-blue-300  justify-center items-center px-4">
        {isLoading ? (
          <Loading />
        ) : (
          avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-200  rounded-full border-2  ${
                  index === selectedAvatar
                    ? "border-blue-300 hover:border-blue-300 border-8 p-0"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  className="h-[2.6rem] md:h-[4rem] lg:h-[6rem]"
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                />
              </div>
            )
          })
        )}
      </div>
      {message.length > 0 && (
        <h3 className="font-semibold text-white">{message}</h3>
      )}
      <button
        className={`font-semibold px-3 md:px-5 py-2 md:text-xl rounded-xl bg-[#1b639a88] disabled:bg-[#ebf0f439] disabled:opacity-25 text-white hover:bg-[#2d8efc88]`}
        onClick={setProfilePicture}
        disabled={isLoading ? true : false}
      >
        Set As prodile Pic
      </button>
    </div>
  )
}

export default SetAvatar
