import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react";
import MyImage from '../Image/profile.png';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';
import '../Css/EditProfile.css';


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
    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);

    }
    const handleCompanyName = (event) => {
        setCompanyName(event.target.value);

    }
    const handleContact = (event) => {
        setContactNum(event.target.value);

    }
    const handleEmail = (event) => {
        setEmail(event.target.value);

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
            .catch((error) => console.log(error));
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
                                        <input type="password" id="" placeholder='Current Password' className='login-field' value={currentPassword} onChange={handleCurrentPasswordChange} />
                                    </div>

                                    <div className='input-group'>
                                        <label>New Password</label>
                                        <input type="password" id="newPassword" placeholder='New Password' className='login-field' value={newPassword} onChange={handleNewPasswordChange} disabled={!currentPassword} />
                                    </div>

                                    <div className='input-group'>
                                        <label>Confirm Password</label>
                                        <input type="password" id="confirmPassword" placeholder='Re-type new password' className='login-field' disabled={!newPassword} onChange={handleConfirmPassword} />
                                    </div>

                                    <p style={{ color: 'red' }}>{passwordError}</p>
                                </div>

                                <div className='details-inputs'>
                                    <div className='input-group'>
                                        <label style={textcolor}>Company Name: </label>
                                        <input type="text" id="" placeholder='eg. sugam123' className='login-field' defaultValue={tableData.companyName} onChange={handleCompanyName} />
                                    </div>

                                    <div className='input-group'>
                                        <label style={textcolor}>Phone Number : </label>
                                        <input type="number" id="" placeholder='9880302189' className='login-field' defaultValue={tableData.contactNum}  onChange={handleContact} />
                                    </div>

                                    <div className='input-group'>
                                        <label style={textcolor}>Email : </label>
                                        <input type="email" id="" placeholder='eg. Bishalnaghar -5, Kathmandu' className='login-field' defaultValue={tableData.email1} onChange={handleEmail} style={{ marginBottom: '20px' }} />{'\n'}
                                    </div>

                                    <button type='submit' className='btn btn-primary' style={{ marginTop: '8px' }}>Save Changes</button>
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