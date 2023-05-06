import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react";
import MyImage from '../Image/profile.png';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';
import '../Css/EditProfile.css';


function ProfileIndividual(){
   
    const token = localStorage.getItem('token');
    const [tableData, setTableData] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tel2, setTel2] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [email,setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);

    }
    const handleFirstName = (event) => {
        setFirstName(event.target.value);

    }
    const handleMiddleName = (event) => {
        setMiddleName(event.target.value);

    }
    const handleLastName = (event) => {
        setLastName(event.target.value);

    }
    const handleContact = (event) => {
        setContactNum(event.target.value);

    }
    const handleEmail = (event) => {
        setEmail(event.target.value);

    }
    const handleTel2 = (event) => {
        setTel2(event.target.value);

    }
    
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        setPasswordError('');
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordError('');
    }
    const textcolor = {
        color: '#525252',
        
    };
    const submitAddReader =(event)=> {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        axios.patch('https://wavebilling-backend-sabinlohani.onrender.com/edit-profile-info', {
          firstName: firstName,
          middleNum: middleName,
          lastName: lastName,
          email: email,
          tel2: tel2,
          currPassword: currentPassword,
          newPassword : newPassword
          }, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }).then(response => { 
            console.log("successful");  
            console.log(response.data);
          }).catch(error => console.log(error.response.data));
    };
    useEffect(() => {
        axios.get("https://wavebilling-backend-sabinlohani.onrender.com/fetch-profile-info", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setTableData(response.data);
      })
      .catch((error) => console.log(error));
      }, []
    );
    return(
        <div className='containerHome'>
            <div className='left-left-nav'>
                <Sidebars/>
            </div>
            <div className='right-right-nav-Home'>

            
            <div className=''>
                <Nav/>
            </div>
            
            <div className='' id='EditProfile'>
                <div className='d-flex'>
                    <form onSubmit={submitAddReader}>
                        <div className='changeSection'>
                            <div>
                                
                                <img src={MyImage} alt='My Profile' style={{  paddingBottom: '20px' }} />
                                <u><p style={{color:'#2F4858'}}>Change Profile Picture</p></u>
                            </div>
                            
                            <div>
                                <label>Current Password</label><br/>
                                <input type="password" id="" placeholder='Current Password' className='login-field' value={currentPassword} onChange={handleCurrentPasswordChange} /><br/> 
                                <label>New Password</label><br/>
                                <input type="password" id="newPassword" placeholder='New Password' className='login-field' value={newPassword} onChange={handleNewPasswordChange} disabled={!currentPassword} /><br/>
                                <label>Confirm Password</label><br/>
                                <input type="password" id="confirmPassword" placeholder='Re-type new password' className='login-field' disabled={!newPassword} onChange={handleConfirmPassword}/><br/>
                                <p style={{color: 'red'}}>{passwordError}</p>
                            </div>
                        </div>
               
                
                        <div>
                            <p>
                                <p >

                                <b style={textcolor}>First Name: </b> <br/>
                                <input type="text" id="" placeholder='eg. sugam123'  className='login-field'  defaultValue={tableData.firstName} onChange={handleFirstName}/>{'\n'}<br/> 
                                <b style={textcolor}>Middle Name: </b> <br/>
                                <input type="text" id="" placeholder='eg. sugam123'  className='login-field'  defaultValue={tableData.middleName} onChange={handleMiddleName}/>{'\n'}<br/> 
                                <b style={textcolor}>Last Name: </b> <br/>
                                <input type="text" id="" placeholder='eg. sugam123'  className='login-field'  defaultValue={tableData.lastName} onChange={handleLastName}/>{'\n'}<br/> 
                                <div>
                                    <b style={textcolor}>Phone Number :</b>  {'\n'}<br/>
                                    <input type="number" id="" placeholder='9880302189'  className='login-field' defaultValue={tableData.tel2} style={{  marginBottom: '20px' }} onChange={handleContact}/>{'\n'}
                                </div>
                                
                                <div>
                                    <b style={textcolor}>Email :</b>  {'\n'}<br/>
                                    <input type="email" id="" placeholder='eg. Bishalnaghar -5, Kathmandu'  className='login-field'  defaultValue={tableData.email}  onChange={handleEmail} style={{  marginBottom: '20px' }}/>{'\n'}  
                                </div>
                                </p>
                           
                            <button type='submit' className='btn btn-primary'  style={{  marginTop: '8px' }}>Save Changes</button>
                            </p> 
                        </div>
                    </form>
                </div >       
            </div>

            </div>
        </div>
    );
}
export default ProfileIndividual;