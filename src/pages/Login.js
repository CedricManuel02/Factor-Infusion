import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const [{},dispatch] = useStateProvider()
  const [Email, setEmail] = useState("cedricmanuel02@gmail.com")
  const [Password, setPassword] = useState("Cedric123!")
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
        try{
          const response = await toast.promise(axios.post("/login", { Email, Password }, { withCredentials: true }),{pending: 'Logging in...', success: 'Login successful!',error: 'Login failed. Please try again.'});
          const users = [{token_: response.data.token_ ,_id: response.data.response._id, FullName: response.data.response.FullName}]
          if(response.status === 200){
            Cookies.set("token", response.data.token_)
            dispatch({ type: reducerCases.SET_USER, token: response.data.token_, user: users});
            navigate("/")
          }
          else{
            toast.error(`${response?.data?.message || "Unknown error occurred"}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          }
        }
        catch(err){
          toast.error(`${err.response?.data?.message || "Unknown error occurred"}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
    }
  return (
    <div className="Container">
        <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="FormContainer">
            <div className="RowContainer">
            <div className="ColumnContainer">
            <label>Email</label>
            <input type="email" placeholder="Email" value={Email} onChange={e => setEmail(e.target.value)} required/>
            </div>
            </div>
            <div className="RowContainer">
              <div className="ColumnContainer">
              <label>Password</label>
            <input type="password" placeholder="Password" value={Password} onChange={e => setPassword(e.target.value)} required/>
              </div>
            </div>
            <span>
              <div className="Checkbox">
                <label htmlFor="checkbox">Remember Me?</label>
                <input type="checkbox" id="checkbox"/>
              </div>  
              <Link>Forgot Password?</Link>
            </span>
            <button type="submit">Login</button>
            <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login
