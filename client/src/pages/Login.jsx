import { Link, useNavigate } from "react-router-dom"
import useForm from "../hooks/useForm"
import validate from "../utils/validate"
import { Collapse } from "react-collapse"
import { LoginRoute } from "../utils/ApiRoutes"
// import axios from "axios"
import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"
import Loading from "../components/common/Loading"

// let options = {
//   method: 'POST',
//   url: url,
//   headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json;charset=UTF-8'
//   },
//   data: {
//       property_one: value_one,
//       property_two: value_two
//   }
// };

const Login = () => {
  const navigate = useNavigate()

  const [apiResult, apiCall] = useFetch(LoginRoute)
  const [message, setMessage] = useState("")
  // console.log("response : ", apiResult)

  const loginCallback = async () => {
    let options = {
      method: "POST",
      data: { email: values.email, password: values.password },
      // withCredentials: true,
    }
    apiCall(options)
  }
  const { values, errors, handleChange, handleSubmit } = useForm(
    loginCallback,
    validate
  )

  useEffect(() => {
    // console.log("login useeffect")
    if (apiResult?.response?.success) {
      localStorage.setItem(
        "chat-app-user",
        JSON.stringify(apiResult?.response?.result)
      )
      navigate("/")
    }
  }, [
    apiResult?.response?.result,
    apiResult?.response?.success,
    apiResult.isSuccess,
    navigate,
  ])

  useEffect(() => {
    // console.log("first time use effect")
    if (localStorage.getItem("chat-app-user")) navigate("/")
  }, [navigate])

  useEffect(() => {
    if (apiResult.error?.message) {
      // console.log("message")
      setMessage(apiResult.error?.message)
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResult.error])

  // console.log(message)

  return (
    <div className="md:bg-[#143047] bg-gray-200 h-screen">
      <div className="flex justify-center items-center h-screen max-w-md mx-auto">
        <div className="p-4 md:p-9 md:px-12 flex flex-col gap-6 w-full bg-gray-200 rounded-lg shadow-lg">
          <h1 className="text-center md:text-5xl text-4xl font-bold text-[#143047]">
            ChatConnect
          </h1>
          <form
            className="flex flex-col gap-5 text-sm md:text-lg"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="text"
                placeholder="Enter email"
                name="email"
                value={values.email || ""}
                onChange={handleChange}
                className="px-4 p-2 rounded-lg focus:outline-none w-full"
              />
              <Collapse isOpened={errors.email}>
                <p className="text-red-500 font-semibold text-sm pt-2 pl-2">
                  {errors.email}
                </p>
              </Collapse>
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={values.password || ""}
                onChange={handleChange}
                className="px-4 p-2 rounded-lg focus:outline-none w-full"
              />
              <Collapse isOpened={errors.password}>
                <p className="text-red-500 font-semibold text-sm pt-2 pl-2">
                  {errors.password}
                </p>
              </Collapse>
            </div>
            <button className="rounded-lg bg-[#143047] text-white p-3 hover:bg-sky-800">
              {apiResult.isLoading ? <Loading /> : "Login"}
            </button>
          </form>
          <Collapse isOpened={message.length > 0}>
            <p className="text-red-500 font-semibold text-sm  pl-2">
              {message}
            </p>
          </Collapse>
          <div className="text-end md:text-lg pr-1 mt-[-25px]">
            <p className="font-bold text-[#1a4060]">
              <Link to={"/register"}>Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
