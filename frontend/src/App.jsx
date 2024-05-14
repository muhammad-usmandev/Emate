import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home/index"
import { ErrorHandling } from "./pages/ErrorHandling/index"
// import Header from "./components/Header"
// import Footer from "./components/Footer"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import HeaderFooterRoute from "./routes/HeaderFooterRoute"
import UserProfile from "./pages/UserProfile"
import Profile from "./pages/Profile"
function App() {

  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="" element={
          <HeaderFooterRoute>
            <Home></Home>
          </HeaderFooterRoute>
        }>
        </Route>
        <Route path="/userprofile/:id" element={<UserProfile />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="*" element={<ErrorHandling />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
