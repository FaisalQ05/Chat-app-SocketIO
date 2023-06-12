import { Link, useNavigate } from "react-router-dom"
import check from "../assets/images/check.png"
import { Collapse } from "react-collapse"
import useForm from "../hooks/useForm"
import validate from "../utils/validate"
import { RegisterRoute } from "../utils/ApiRoutes"
import { useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"
import Loading from "../components/common/Loading"

const Register = () => {
  const navigate = useNavigate()
  const [apiResult, apiCall] = useFetch(RegisterRoute)
  const [message, setMessage] = useState("")

  const registerCallback = async () => {
    let options = {
      method: "POST",
      data: {
        email: values.email,
        password: values.password,
        username: values.name,
      },
      // withCredentials: true,
    }
    apiCall(options)
  }
  const { values, errors, handleChange, handleSubmit } = useForm(
    registerCallback,
    validate,
    true
  )

  useEffect(() => {
    if (apiResult?.response?.success) {
      localStorage.setItem(
        "chat-app-user",
        JSON.stringify(apiResult?.response?.result)
      )
      navigate("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    apiResult.isSuccess,
    apiResult?.response?.result,
    apiResult?.response?.success,
    navigate,
  ])

  useEffect(() => {
    if (apiResult.error?.message) {
      // console.log("message")
      setMessage(apiResult.error?.message)
      setTimeout(() => {
        setMessage("")
      }, 3000)
    }
  }, [apiResult.error])

  // console.log(apiResult)
  // console.log(message)

  return (
    <div className="md:bg-[#143047] bg-gray-200 h-screen">
      <div className="flex justify-center items-center h-full max-w-md mx-auto">
        <div className="p-4 md:p-9 md:px-12 flex flex-col gap-6 w-full bg-gray-200 rounded-lg shadow-lg">
          <h1 className="text-center md:text-5xl text-4xl font-bold text-[#143047]">
            ChatConnect
          </h1>
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-5 text-sm md:text-lg`}
          >
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={values.name || ""}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className={`px-4 p-2 rounded-lg focus:outline-none w-full`}
                />
              </div>
              {/* <p className={`text-red-500 font-semibold text-sm mt-2`}>
                {!errState.name.validate && errState.name.message}
              </p> */}
              <Collapse isOpened={errors.name}>
                <p className={`text-red-500 font-semibold text-sm pt-2 pl-2`}>
                  {errors.name}
                </p>
              </Collapse>
            </div>
            <div>
              <input
                type="text"
                name="email"
                value={values.email || ""}
                onChange={handleChange}
                placeholder="Enter email"
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
                name="password"
                value={values.password || ""}
                onChange={handleChange}
                placeholder="Enter Password"
                className="px-4 p-2 rounded-lg focus:outline-none w-full"
              />
              <Collapse isOpened={errors.password}>
                <p className="text-red-500 font-semibold text-sm pt-2 pl-2">
                  {errors.password}
                </p>
              </Collapse>
            </div>
            <div>
              <div className="relative transition-all duration-100">
                <input
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword || ""}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="px-4 p-2 rounded-lg focus:outline-none w-full"
                />
                <img
                  src={check}
                  className={`w-[1.1em] absolute top-[50%] right-3 translate-y-[-50%] ${
                    !(
                      values?.confirmPassword?.length > 0 &&
                      values.confirmPassword === values.password &&
                      values.confirmPassword.length > 4
                    ) && "hidden"
                  }`}
                />
              </div>
              <Collapse isOpened={errors.confirmPassword}>
                <p className="text-red-500 font-semibold text-sm pt-2 pl-2">
                  {errors.confirmPassword}
                </p>
              </Collapse>
            </div>
            <button className="rounded-lg bg-[#143047] text-white p-3 hover:bg-sky-800">
              {apiResult.isLoading ? <Loading /> : "Register"}
            </button>
            <Collapse isOpened={message.length > 0}>
              <p className="text-red-500 font-semibold text-sm pl-2">
                {message}
              </p>
            </Collapse>

            <div className="text-center md:text-lg mt-[-18px]">
              <p className="font-semibold">
                Already Have an account ?{" "}
                <span className="text-[#1a4060] font-bold">
                  <Link to={"/login"}>Login here</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
