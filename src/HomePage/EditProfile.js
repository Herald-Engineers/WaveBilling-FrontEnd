import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react";
import MyImage from '../Image/profile.png';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';
import '../Css/EditProfile.css';

import Button from 'react-bootstrap/Button';

function EditProfile() {

    const token = localStorage.getItem('token');
    const [tableData, setTableData] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [telError, setTelError] = useState('');
    const [emailError, setEmailError] = useState('');
    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);

    }
    const handleCompanyName = (event) => {
        setCompanyName(event.target.value);

    }
    const handleContact = (event) => {
        const contactValue = event.target.value;
        setContactNum(contactValue);
        const regex = /^[0-9]+$/; // regex pattern to match only digits
        if (!regex.test(contactValue)) {
        setTelError("Please enter numbers only");
        } else if (contactValue.length !== 10) {
        setTelError("Phone number must be 10 digits");
        } else {
        setTelError("");
        }
        

    }
    //regex for email
    const handleEmail = (event) => {
        const emailValue = event.target.value;
        setEmail(event.target.value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            setEmailError("Please enter a valid email");
        } else {
            setEmailError("");
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
    const submitAddReader = (event) => {
        setPasswordError('');
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        console.log({
            companyName: companyName,
            contactNum: contactNum,
            email1: email,
            currPassword: currentPassword,
            newPassword: newPassword
        })
        axios.patch('https://wavebilling-backend-sabinlohani.onrender.com/edit-profile-info', {
            companyName: companyName,
            contactNum: contactNum,
            email1: email,
            currPassword: currentPassword,
            newPassword: newPassword
        }, {
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
                const { companyName, contactNum, email1 } = response.data;
                setCompanyName(companyName);
                setContactNum(contactNum);
                setEmail(email1);
                setTableData(response.data);
            })
            .catch((error) => console.log(error.response.data));
    }, []
    );
    return (
        <div className='containerHome'>
            <div className='left-left-nav'>
                <Sidebars />
            </div>

            <div className='right-right-nav-Home'>


                <div className=''>
                    <Nav />
                </div>

                <div className='' id='EditProfile'>
                    <div className='edit-form-container'>
                        <form className='edit-form' onSubmit={submitAddReader}>

                            <div className='changeSection'>

                                <div className='password-change-inputs'>
                                    <div>
                                        <img src={MyImage} alt='My Profile' />
                                        <u><p style={{ color: '#2F4858' }}>Change Profile Picture</p></u>
                                    </div>

                                    <div className='input-group'>
                                        <label>Current Password</label>
                                        <input type="password" id="" placeholder='Current Password' className='login-field' value={currentPassword} onChange={handleCurrentPasswordChange}  style={{marginBottom:'20px'}}/>
                                    </div>

                                    <div className='input-group'>
                                        <label>New Password</label>
                                        <input type="password" id="newPassword" placeholder='New Password' className='login-field' value={newPassword} onChange={handleNewPasswordChange} disabled={!currentPassword} style={{marginBottom:'20px'}}/>
                                    </div>

                                    <div className='input-group'>
                                        <label>Confirm Password</label>
                                        <input type="password" id="confirmPassword" placeholder='Re-type new password' className='login-field' disabled={!newPassword} onChange={handleConfirmPassword} style={{marginBottom:'20px'}}    />
                                    </div>

                                    <p style={{ color: 'red' }}>{passwordError}</p>
                                </div>

                                <div className='details-inputs' style={{textAlign:'left'}}>
                                    <div >
                                        <label>Company Name: </label> {'\n'}<br />
                                        <input type="text" id="" placeholder='Company name' className='login-field' defaultValue={tableData.companyName} onChange={handleCompanyName} style={{marginBottom:'20px'}}/>{'\n'}
                                        
                                    </div>
                                        <div>
                                            <label>Phone Number :</label>  {'\n'}<br />
                                            <input type="number" id="" placeholder='Phone Number' className='login-field' defaultValue={tableData.contactNum} style={{ marginBottom: '20px' }} onChange={handleContact} />{'\n'}
                                            {telError && <div className="error" style={{ color: 'red' }}>{telError}</div>}
                                        </div>

                                        <div>
                                            <label>Email :</label>  {'\n'}<br />
                                            <input type="email" id="" placeholder='Email' className='login-field' defaultValue={tableData.email1} onChange={handleEmail} style={{ marginBottom: '20px' }} />{'\n'}
                                            {emailError && <div className="error" style={{ color: 'red' }}>{emailError}</div>}
                                        </div>
                                    

                                    <Button type='submit' className='btn btn-primary' style={{ marginTop: '8px' }}>Save Changes</Button>
                                </div>

                            </div>

                       
                        </form>
                    </div >
                   
                </div>

            </div>
        </div>
    );
}
export default EditProfile;