import React, {useState}from 'react';
import MyImage from './Image/logo123.png';
import './App.css';
import './Components/form.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NextPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [noFieldChoosen, setNoFieldChoosen] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  console.log(email);
  console.log(username);
  localStorage.setItem('role',username);
  localStorage.setItem('role',email);
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setNoFieldChoosen('');
    // const loginBtn = document.getElementById('send-otp');
    // loginBtn.disabled = true;
    
    // setLoading(true);
    if (!username && !email) {
      // Display an error message or prevent the form from submitting
      setNoFieldChoosen("PLease choose any one");
      return;
    }
    // Send a POST request to the server with the entered username or email
    axios.post("https://wavebilling-backend-sabinlohani.onrender.com/send-otp", {
      userName: username,
      email: email
    })
      .then(response => {
        // setServerResponseReceived(true);
        // setLoading(false);
        
        console.log(response.data);
        console.log("Email sent");

        navigate("/otp");
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
      <img src={MyImage} alt='Wave Billing System Logo' className='forgetLogo'/>
      <h4 className='fontfamily'>RESET THE PASSWORD</h4>
      <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your username" name='username' className="login-field" onChange={handleUsernameChange}/>
            <center><p>Or</p></center>
            <input type="text" placeholder="Enter your email" name="email" className="login-field" onChange={handleEmailChange}/>
            
            {noFieldChoosen && <div style={{ color: 'red'}}>{noFieldChoosen}</div>}
            {errorMessage && <div style={{ color: 'red'}}>{errorMessage}</div>}

     <button className='btn btn-primary' type='submit' id="send-otp">SEND OTP</button>
       </form>
    </div>
  );
}

export default NextPage;