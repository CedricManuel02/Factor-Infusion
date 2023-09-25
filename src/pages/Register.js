import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function Register() {
  const [FullName, setFullName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Hemophilia, setHemophilia] = useState("")
  const [Severity, setSeverity] = useState("")
  const [HasInhibitor, setHasInhibitor] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/register", {FullName,Email,Password,Hemophilia,Severity,HasInhibitor})
      if(response.status === 200 ){
        setFullName("")
        setEmail("")
        setPassword("")
        setHemophilia("")
        setSeverity("")
        setHasInhibitor("")
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
    } catch (err) {
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
  };
  return (
    <div className="Container">
        <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="FormContainer">
          <div className="RowContainer">
            <div className="ColumnContainer">
              <label>Full Name</label>
              <input type="text" placeholder="Full Name" value={FullName} onChange={e => setFullName(e.target.value)} required />
            </div>
          </div>
          <div className="RowContainer">
            <div className="ColumnContainer">
              <label>Email</label>
              <input type="email" placeholder="Email" value={Email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="RowContainer">
            <div className="ColumnContainer">
              <label>Password</label>
              <input type="password" placeholder="Password" value={Password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="RowContainer">
            <div className="ColumnContainer">
              <label>Hemophilia</label>
              <select value={Hemophilia} onChange={e => setHemophilia(e.target.value)}>
                <option defaultValue={""}>Select</option>
                <option value={"Hemophilia A"}>Hemophilia A</option>
                <option value={"Hemophilia B"}>Hemophilia B</option>
                <option value={"Von Willebrand"}>Von Willebrand</option>
              </select>
            </div>
            <div className="ColumnContainer">
              <label>Severity</label>
              <select value={Severity} onChange={e => setSeverity(e.target.value)}>
                <option defaultValue={""}>Select</option>
                <option value={"Mild"}>Mild</option>
                <option value={"Moderate"}>Moderate</option>
                <option value={"Severe"}>Severe</option>
              </select>
            </div>
            <div className="ColumnContainer">
              <label>Inhibitor?</label>
              <select value={HasInhibitor} onChange={e => setHasInhibitor(e.target.value)}>
                <option defaultValue={""}>Select</option>
                <option value={"Have Inhibitor"}>Have Inhibitor</option>
                <option value={"Don't have Inhibitor"}>Don't have Inhibitor</option>
              </select>
            </div>
          </div>
          
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
