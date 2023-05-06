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
                    <div className='d-flex'>
                        <form onSubmit={submitAddReader}>
                            <div className='changeSection'>
                                <div>

                                    <img src={MyImage} alt='My Profile' style={{ paddingBottom: '20px' }} />
                                    <u><p style={{ color: '#2F4858' }}>Change Profile Picture</p></u>
                                </div>

                                <div>
                                    <label>Current Password</label><br />
                                    <input type="password" id="" placeholder='Current Password' className='login-field' value={currentPassword} onChange={handleCurrentPasswordChange} /><br />
                                    <label>New Password</label><br />
                                    <input type="password" id="newPassword" placeholder='New Password' className='login-field' value={newPassword} onChange={handleNewPasswordChange} disabled={!currentPassword} /><br />
                                    <label>Confirm Password</label><br />
                                    <input type="password" id="confirmPassword" placeholder='Re-type new password' className='login-field' disabled={!newPassword} onChange={handleConfirmPassword} /><br />
                                    <p style={{ color: 'red' }}>{passwordError}</p>
                                </div>
                            </div>


                            <div>
                                <p>
                                    <p >

                                        <b style={textcolor}>Company Name: </b> <br />
                                        <input type="text" id="" placeholder='eg. sugam123' className='login-field' defaultValue={tableData.companyName} onChange={handleCompanyName} />{'\n'}<br />

                                        <div>
                                            <b style={textcolor}>Phone Number :</b>  {'\n'}<br />
                                            <input type="number" id="" placeholder='9880302189' className='login-field' defaultValue={tableData.contactNum} style={{ marginBottom: '20px' }} onChange={handleContact} />{'\n'}
                                        </div>

                                        <div>
                                            <b style={textcolor}>Email :</b>  {'\n'}<br />
                                            <input type="email" id="" placeholder='eg. Bishalnaghar -5, Kathmandu' className='login-field' defaultValue={tableData.email1} onChange={handleEmail} style={{ marginBottom: '20px' }} />{'\n'}
                                        </div>
                                    </p>

                                    <button type='submit' className='btn btn-primary' style={{ marginTop: '8px' }}>Save Changes</button>
                                </p>
                            </div>
                        </form>
                    </div >
                </div>

            </div>
        </div>
    );
}
export default EditProfile;