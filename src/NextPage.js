import React, {useState}from 'react';
import MyImage from './Image/logo123.png';
import './App.css';
import './Components/form.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NextPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [noFieldChoosen, setNoFieldChoosen] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleGoToNextPage = (event) => {
    navigate('/otp');
  };
  console.log(email);
 
  localStorage.setItem('email',email);
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setNoFieldChoosen('');
    if (!email) {
      // Display an error message if no field choosen
      setNoFieldChoosen("PLease choose any one");
      return;
    }
    
    // Send a POST request to the server with the entered username or email
    axios.post("https://wavebilling-backend-sabinlohani.onrender.com/send-otp", { 
      email
    })
      .then(response => {
        // setServerResponseReceived(true);
        // setLoading(false);
        navigate('/otp');
        console.log(response);
        console.log("Email sent");

      })
      .catch(error => {
        
        // loginBtn.disabled = false;
        // setLoading(false);
        console.log(error);
        console.log(error.response.data);
        setErrorMessage(error.response.data.message);
      });
      console.log("hello it");
  };
  
  return (
    <div className='container-login'>
      <img src={MyImage} alt='Wave Billing System Logo' className='forgetLogo'/>
      <h4 className='fontfamily'>RESET THE PASSWORD</h4>
      <form onSubmit={handleSubmit}>
            
            <input type="text" placeholder="Enter your email" name="email" className="login-field" onChange={handleEmailChange}/>
            
            {noFieldChoosen && <div style={{ color: 'red'}}>{noFieldChoosen}</div>}
            {errorMessage && <div style={{ color: 'red'}}>{errorMessage}</div>}

     <button className='btn btn-primary' type='submit' id="send-otp" >SEND OTP</button>
       </form>
    </div>
  );
}

export default NextPage;