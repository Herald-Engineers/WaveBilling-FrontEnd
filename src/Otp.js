import React from 'react';
import MyImage from './Image/logo123.png';
import './App.css';
import './Components/form.css';
import { Link } from 'react-router-dom';

function Otp() {
 
  return (
    <div className='container-login'>
      <img src={MyImage} className='forgetLogo' alt='Wave Billing System Logo'  />
      <h4 className='fontfamily'>Enter your OTP</h4>
      
      <form>
            <input type="text" placeholder="Enter OTP" className="login-field"/>
           
      <form>
            <input type="password" placeholder="New Password" className="login-field"/>
        </form>
        
        <Link to="/createAcc"><button className='btn btn-primary' >Verify</button></Link>
      </form>
     
      
    </div>
  );
}

export default Otp;