import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react";
import MyImage from '../Image/profile.png';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';
import '../Css/EditProfile.css';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../Components/LoadingSpinner';
import {MdVerified} from "react-icons/md";
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered  >
        
            <Modal.Body style={{padding:'68px',backgroundColor:'#D9D9D9'}}>
                <center>
                <MdVerified size={40} style={{color: 'green'}}/><br/>
                <span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}>Your changes have been<br/>successfully made</span></center>
                <div className='main-box text-center'>
            
                   
                    <Link to='/'><Button onClick={props.onHide} className='i-understand'>Okay</Button></Link>
                </div>
            </Modal.Body>
       
        </Modal>
    );
}

function ProfileIndividual(){
   
    const token = localStorage.getItem('token');
    const [tableData, setTableData] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tel2, setTel2] = useState('');
    const [email,setEmail] = useState('');
    const [telError, setTelError] = useState('');
    const [serverResponseReceived, setServerResponseReceived] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [modalShow, setModalShow] = React.useState(false);
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
    
    const handleEmail = (event) => {
        setEmail(event.target.value);

    }
    const handleTel2 = (event) => {
        const contactValue = event.target.value;
        setTel2(contactValue);
        const regex = /^[0-9]+$/; // regex pattern to match only digits
        if (!regex.test(contactValue)) {
            setTelError("Please enter numbers only");
        } else if (contactValue.length !== 10) {
            setTelError("Phone number must be 10 digits");
        } else {
            setTelError("");
        }
       

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
        console.log({
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            currPassword: currentPassword,
            newPassword: newPassword
        })
        axios.patch('https://wavebilling-backend-sabinlohani.onrender.com/edit-profile-info', {
          firstName: firstName,
          middleName: middleName,
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
          }).catch(error => {
                console.log(error.response.data.message);
                setPasswordError(error.response.data.message);
            });
    };
    useEffect(() => {
        axios.get("https://wavebilling-backend-sabinlohani.onrender.com/fetch-profile-info", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        const { firstName, middleName, lastName,tel2,email } = response.data;
                setFirstName(firstName);
                setMiddleName(middleName);
                setLastName(lastName);
                setTel2(tel2);
                setEmail(email);
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
                <div className='edit-form-container'>
                    <form className='edit-form'onSubmit={submitAddReader}>
                        <div className='changeSection'>
                            <div className='password-change-inputs' >
                            <div>
                                
                                <img src={MyImage} alt='My Profile' style={{  paddingBottom: '20px' }} />
                                <u><p style={{color:'#2F4858'}}>Change Profile Picture</p></u>
                            </div>
                            
                            <div style={{textAlign:'left',paddingLeft:'5px'}}>
                                <label style={{ paddingLeft:'10px'}}>Current Password</label><br/>
                                <input type="password" id="" placeholder='Current Password' className='login-field' value={currentPassword} onChange={handleCurrentPasswordChange} style={{ marginBottom: '20px'}} /><br/> 
                                <label style={{ paddingLeft:'10px'}}>New Password</label><br/>
                                <input type="password" id="newPassword" placeholder='New Password' className='login-field' value={newPassword} onChange={handleNewPasswordChange} disabled={!currentPassword} style={{ marginBottom: '20px' }}  /><br/>
                                <label style={{ paddingLeft:'10px'}}>Confirm Password</label><br/>
                                <input type="password" id="confirmPassword" placeholder='Re-type new password' className='login-field' disabled={!newPassword} onChange={handleConfirmPassword} style={{ marginBottom: '20px' }} /><br/>
                                <p style={{color: 'red'}}>{passwordError}</p>
                            </div>
                            </div>
                        
                            <p>
                            <div className='details-inputs' style={{textAlign:'left'}}>
                                <p >

                                <label style={{ paddingLeft:'10px'}}>First Name: </label> <br/>
                                <input type="text" id="" placeholder='eg. sugam123'  className='login-field'  defaultValue={tableData.firstName} onChange={handleFirstName} style={{ marginBottom: '20px' }} />{'\n'}<br/> 
                                <label style={{ paddingLeft:'10px'}}>Middle Name: </label> <br/>
                                <input type="text" id="" placeholder='eg. sugam123'  className='login-field'  defaultValue={tableData.middleName} onChange={handleMiddleName} style={{ marginBottom: '20px' }} />{'\n'}<br/> 
                                <label style={{ paddingLeft:'10px'}}>Last Name: </label> <br/>
                                <input type="text" id="" placeholder='eg. sugam123'  className='login-field'  defaultValue={tableData.lastName} onChange={handleLastName} style={{ marginBottom: '20px' }} />{'\n'}<br/> 
                                <div>
                                    <label style={{ paddingLeft:'10px'}}>Phone Number :</label>  {'\n'}<br/>
                                    <input type="number" id="" placeholder='9880302189'  className='login-field' defaultValue={tableData.tel2} onChange={handleTel2} style={{ marginBottom: '20px' }} />{'\n'}
                                    {telError && <div className="error" style={{ color: 'red' }}>{telError}</div>}
                                </div>
                                
                                <div>
                                    <label style={{ paddingLeft:'10px'}}>Email :</label>  {'\n'}<br/>
                                    <input type="email" id="" placeholder='eg. Bishalnaghar -5, Kathmandu'  className='login-field'  defaultValue={tableData.email}  onChange={handleEmail} style={{  marginBottom: '20px' }}/>{'\n'}  
                                </div>
                                </p>
                           
                            <Button type='submit' className='btn btn-primary'  style={{  marginTop: '8px' }}>Save Changes</Button>
                            
                            </div>
                            </p> 
                        </div>
                    </form>
                    {loading && !serverResponseReceived && <LoadingSpinner />}
                        {serverResponseReceived ? (
                        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />) : null}
                </div >       
            </div>

            </div>
        </div>
    );
}
export default ProfileIndividual;