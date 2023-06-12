import axios from "axios"
import { useCallback, useEffect, useState } from "react"

const useFetch = (url) => {
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [param, setParam] = useState(null)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState({})
  //   console.log("useFetch started")
  const doFetch = useCallback(
    (options = {}, apiParams = null, params = false) => {
      // console.log("do fetch")
      setOptions(options)
      setIsLoading(true)
      if (params) {
        setParam(apiParams)
      }
    },
    []
  )

  useEffect(() => {
    if (!isLoading) {
      return
    }

    const fetchData = async () => {
      // console.log("fetching data")

      try {
        let res
        if (param) {
          res = await axios(`${url}/${param}`, options)
        } else {
          res = await axios(url, options)
        }

        setResponse(res.data)
        setError(null)
        setIsSuccess(true)
      } catch (err) {
        const data = err.response ? err.response.data : "Server error"
        setError(data)
        setResponse(null)
        setIsSuccess(false)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [isLoading, options, param, url])

  return [{ response, error, isLoading, isSuccess }, doFetch]
}

export default useFetch
