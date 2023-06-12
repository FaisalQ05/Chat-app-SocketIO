import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Layout from "./layout/Layout"
import SetAvatar from "./pages/SetAvatar"
console.log("updated one")
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Chat />} />
          <Route path="setAvartar" element={<SetAvatar />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
