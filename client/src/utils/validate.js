export default function validate(values, register = false) {
  let errors = {}
  if (!values.email) {
    errors.email = "Please enter your email address"
  } else if (
    // eslint-disable-next-line no-useless-escape
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
  ) {
    errors.email = "Please enter a valid email address"
  }
  if (!values.password) {
    errors.password = "Please enter a password"
  } else if (!/^(?=.*[A-Za-z0-9])(?!.*\s).{5,}$/.test(values.password)) {
    errors.password =
      "Password should contain at least 5 characters without spaces"
  }

  if (register) {
    if (!values.name) {
      errors.name = "Please enter your name"
    } else if (values.name.length <= 3) {
      errors.name = "Name should be longer than 3 characters"
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please enter your password again to confirm"
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password do not match"
    }
  }

  return errors
}

// if (!user.name.length) {
//   setErrorState((p) => ({
//     ...p,
//     name: { message: "Please enter your name", validate: false },
//   }))
// } else if (user.name.length <= 4) {
//   setErrorState((p) => ({
//     ...p,
//     name: {
//       message: "Name should be longer than 4 characters",
//       validate: false,
//     },
//   }))
// } else {
//   setErrorState((p) => ({
//     ...p,
//     name: {
//       message: "",
//       validate: true,
//     },
//   }))
// }

// if (!user.email.length) {
//   setErrorState((p) => ({
//     ...p,
//     email: {
//       message: "Please enter your email address",
//       validate: false,
//     },
//   }))
// } else if (
//   // eslint-disable-next-line no-useless-escape
//   !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)
// ) {
//   console.log("invalid")
//   setErrorState((p) => ({
//     ...p,
//     email: {
//       message: "Please enter a valid email address",
//       validate: false,
//     },
//   }))
// } else {
//   setErrorState((p) => ({
//     ...p,
//     email: {
//       message: "",
//       validate: true,
//     },
//   }))
// }

// if (!user.password.length) {
//   setErrorState((p) => ({
//     ...p,
//     password: {
//       message: "Please enter a password",
//       validate: false,
//     },
//   }))
// } else if (!/^(?=.*[A-Za-z0-9])(?!.*\s).{5,}$/.test(user.password)) {
//   setErrorState((p) => ({
//     ...p,
//     password: {
//       message: "Password should contain at least 5 characters",
//       validate: false,
//     },
//   }))
// } else {
//   setErrorState((p) => ({
//     ...p,
//     password: {
//       message: "",
//       validate: true,
//     },
//   }))
// }

// if (!user.confirmPassword.length) {
//   setErrorState((p) => ({
//     ...p,
//     confirmPassword: {
//       message: "Please enter your password again to confirm",
//       validate: false,
//     },
//   }))
// } else if (user.password !== user.confirmPassword) {
//   setErrorState((p) => ({
//     ...p,
//     confirmPassword: {
//       message: "Password do not match",
//       validate: false,
//     },
//   }))
// }
