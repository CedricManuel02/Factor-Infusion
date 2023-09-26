import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import MenuIcon from '@mui/icons-material/Menu';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';
import Cookies from 'js-cookie';
import CloseIcon from '@mui/icons-material/Close';
function Navbar() {
  const [{user},dispatch] = useStateProvider()
  const [show, setShow] = useState(false)
  const [menu, setMenu] = useState(false)
  const navigate = useNavigate()
  const handleShow = () => {
    if(show){
      setShow(false)
    }
    else{
      setShow(true)
    }
  }
  const handleSignout = () => {
      Cookies.remove("token");
      dispatch({ type: reducerCases.SET_USER, token: null});
  }
  return (
    <nav>
      <section>
        <h2>Infusion</h2>
        <span>
        <div className="IconContainer">
        {user && user.length > 0 && 
        <div className="Profile">
            <img onClick={handleShow} src={`https://api.dicebear.com/7.x/initials/svg?seed=${user[0].FullName}`} alt="Profile"/>
            <div className={show ? "ProfileContainer Show" : "ProfileContainer"}>
            <div className="ProfileWrapper"> 
              <span><Link>Profile</Link></span>
              <span><Link to={"/infusion"}>Infusion Log</Link></span>
              <span onClick={handleSignout}><Link>Log out</Link></span>
            </div>
            </div>
        </div>
        }
        <MenuIcon onClick={() => setMenu(true)}/>
        </div>
        </span>
        <ul className={menu ? "Sidebar Active" : "Sidebar"}>
            <span onClick={() => setMenu(false)}><CloseIcon/></span>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link>About</Link></li>
            <li><Link>Instructions</Link></li>
            {user && user.length > 0 ? 
            <li className={menu ? "Profile Active" : null} onClick={handleShow}>
            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user[0].FullName}`} alt="Profile"/>{user[0].FullName}<KeyboardArrowDownSharpIcon/>
            <div className={show ? "ProfileContainer Show" : "ProfileContainer"}>
            <div className="ProfileWrapper"> 
              <span><Link>Profile</Link></span>
              <span><Link to={"/infusion"}>Infusion Log</Link></span>
              <span onClick={handleSignout}><Link>Log out</Link></span>
            </div>
            </div>
            </li> :  
            <>
            <li><Link to={"/register"}>Register</Link></li>
            <li><Link to={"/login"}>Sign In</Link></li>
            </>}
        </ul>
      </section>
    </nav>
  )
}

export default Navbar
