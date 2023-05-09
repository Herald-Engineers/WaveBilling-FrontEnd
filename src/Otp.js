import React from 'react';
import MyImage from './Image/logo123.png';
import './App.css';
import './Components/form.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function Otp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const username = localStorage.getItem('username');
    setUsername(username);
  }, []);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setRole(role);
  }, []);

  useEffect(() => {
    const email = localStorage.getItem('email');
    setEmail(email);
  }, []);

  
  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };
  const handleOtp = (event) => {
    setOtp(event.target.value);
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
   
    
    // Send a POST request to the server with the entered username or email
    axios.post("https://wavebilling-backend-sabinlohani.onrender.com/verify-otp", {
      otp :otp,
      newPassword : newPassword,
      userRole : role,
      userName:username,
      email: email
    })
      .then(response => {
        // setServerResponseReceived(true);
        // setLoading(false);
        console.log(response.data);
        console.log("Email sent");
        navigate("/login");
      })
      .catch(error => {
        
        // loginBtn.disabled = false;
        // setLoading(false);
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
      });
  };


  
  
  
  return (
    <div className='container-login'>
      <img src={MyImage} className='forgetLogo' alt='Wave Billing System Logo'  />
      <h4 className='fontfamily'>Enter your OTP</h4>
      
      <form onSubmit={handleSubmit}>
        <input type="text" name="otp" placeholder="Enter OTP" className="login-field" onChange={handleOtp}/>
           
      
        <input type="password" name="newPassword" placeholder="New Password" className="login-field" onChange={handleNewPassword} />
       
        <button className='btn btn-primary' type='submit'>Verify</button>
      </form>
     
      
    </div>
  );
}

export default Otp;