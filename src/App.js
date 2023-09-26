import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Infusion from "./pages/Infusion"
import { useStateProvider } from "./utils/StateProvider"
import Cookies from "js-cookie"
import axios from "axios"
import { reducerCases } from "./utils/Constants"
import React,{ useEffect } from "react"
axios.defaults.baseURL = 'https://sleepy-seal-sari.cyclic.cloud/api/v1';
function App() {
  const [{user}, dispatch] = useStateProvider()
  useEffect(() => {
    try{
      const token = Cookies.get("token")
    if (token && user.length === 0) {
      const getData = async () => {
        try {
          const response = await axios.get("/user", {headers: { Authorization: `Bearer ${token}` }})
          const users = [{_id: response.data.user._id, FullName: response.data.user.FullName}]
          dispatch({ type: reducerCases.SET_USER, token_: token, user: users })
        } catch (err) {
          console.log("Something went wrongsss", err)
        }
      }
      getData()
    }
    }
    catch(err){
      console.log("something went wrong", err)
    }
  }, [user, dispatch])
  return (
    <div className="App">
      <Navbar/>
      <Routes>
       <Route path={"/login"} element={user && user.length > 0 ? <Navigate to={"/"}/> : <Login/>}/>
       <Route path={"/register"} element={user && user.length > 0  ? <Navigate to={"/"}/> : <Register/>}/>
       <Route path={"/infusion"} element={user && user  ? <Infusion/> : <Navigate to={"/"}/>}/>
       <Route path={"/"} element={
       <div>
        <Home/>
        <div className="CardContainer">
                <div className="Card">
                    <h3>💕</h3>
                    <h4>Learn how to infuse</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and 
                       typesetting industry.</p>
                </div>
                <div className="Card">
                    <h3>💉</h3>
                    <h4>Learn how to infuse</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and 
                       typesetting industry.</p>
                </div>
                <div className="Card">
                    <h3>✍</h3>
                    <h4>Learn how to infuse</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and 
                       typesetting industry.</p>
                </div>
            </div>
       </div>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
