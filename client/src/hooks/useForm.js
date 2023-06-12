import { useState, useEffect } from "react"

const useForm = (callback, validate, register = false) => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, isSubmitting])

  useEffect(() => {
    if (values?.email) {
      setErrors((p) => ({ ...p, email: "" }))
    }
    if (values?.password) {
      setErrors((p) => ({ ...p, password: "" }))
    }
    if (values?.confirmPassword) {
      setErrors((p) => ({ ...p, confirmPassword: "" }))
    }
    if (values?.name) {
      setErrors((p) => ({ ...p, name: "" }))
    }
  }, [values])

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    if (register) {
      setErrors(validate(values, register))
    } else {
      setErrors(validate(values))
    }
    setIsSubmitting(true)
  }

  const handleChange = (event) => {
    event.persist()
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }))

    // on Onchamge Error checking
    // setErrors(validate(values))
  }

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  }
}

export default useForm
