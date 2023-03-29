import React, { useState } from 'react';
import '../Admin/MeterReader.css';
import {BiAddToQueue} from "react-icons/bi";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../Components/LoadingSpinner';


function MyVerticallyCenteredModal(props) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJyYW1lc2giLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWQiOiI2NDFhZmQ1ODJiMzYxZDI3ODY2NzRmNjEiLCJpYXQiOjE2ODAwOTI2NjB9.1-rmZNz7uaa_AH6wil2n6L-eRCA5EvXKbhDn9XHYSJU';
    // Set the token in local storage
    localStorage.setItem('token', token);
    
    // Get the token from local storage
    const storedToken = localStorage.getItem('token');
    const [fullName, setFullname] = useState("");
    const [readerId, setReader] = useState("");
    const [password, setPassword] = useState("");
    const [contactNum, setContact] = useState("");
    const [email, setEmail] = useState("");
    // Retrieve the token from localStorage
    // const token = localStorage.getItem('token');
    const handleFullName = (event) => {
        setFullname(event.target.value);
    };
    const handleReader = (event) => {
        setReader(event.target.value);
    };
    
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleContact = (event) => {
        setContact(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    console.log(fullName);
    console.log(readerId);
    console.log(password);
    console.log(storedToken);

    const [serverResponseReceived, setServerResponseReceived] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        console.log("on process");
        axios.post('https://wavebilling-backend-sabinlohani.onrender.com/admin/add-reader',  {
            fullName:fullName,
            readerId:readerId,
            password:password,
            contactNum:contactNum,
            email:email,
            token:storedToken,
            
        })
        .then(response => { 
            console.log("successful");  
            console.log(response);
            
            setServerResponseReceived(true);
                   
            setLoading(false);
            
            })
            .catch(error => console.log(error));
        
    };
    return (
        <Modal
        {...props}
       size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered  
      >
        
    <Modal.Body style={{padding:'60px',backgroundColor:'#D9D9D9'}}>
            <center>
                <span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}>Create an account</span>
            </center>
            <div className='main-box text-center'>
             <form onSubmit={handleSubmit}>
                <p>Please enter the Reader ID and temporary password for the Reader.</p>
                <div className='meter-Table'>
                   
                        <table >
                            <tr>
                                <td>
                                    <label>Full Name:</label> 
                                </td>
                                <td>
                                    <input type="text" id="editFirstName" placeholder='Full Name'   value={fullName} onChange={handleFullName} required className='login-field'/>{'\n'}<br/>
                                </td>
                            </tr>
                            <tr>    
                                <td> <label>Reader Id:</label><br/>
                                </td>
                                <td>
                                    <input type="text" id="editFirstName" placeholder='Reader Id' value={readerId} onChange={handleReader} required className='login-field'/>{'\n'}<br/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Password:</label> 
                                </td>
                                <td>
                                    <input type="text" id="editFirstName" placeholder='Password' required value={password} onChange={handlePassword} className='login-field'/>{'\n'}<br/>
                                </td>
                            </tr>
                            <tr>    
                                <td> <label>Contact No:</label><br/>
                                </td>
                                <td>
                                    <input type="text" id="editFirstName" placeholder='Contact' required value={contactNum} onChange={handleContact} className='login-field'/>{'\n'}<br/>
                                </td>
                            </tr>
                            <tr>    
                                <td> <label>Email Address:</label><br/>
                                </td>
                                <td>
                                    <input type="text" id="editFirstName" placeholder='Email' required value={email} onChange={handleEmail} className='login-field'/>{'\n'}<br/>
                                </td>
                            </tr>
                        </table>
                    
                    {loading && !serverResponseReceived && <LoadingSpinner />}
                    
                </div>
               
               
                <Button onClick={props.onHide} className='meterButtons'>Go Back</Button>
                <input onClick={props.onHide} className='meterButtons2' type='submit' value="submit"  />
                </form>
            </div>
        </Modal.Body>
       
      </Modal>
    
    );
}
function MeterRead(){
    const [modalShow, setModalShow] = React.useState(false);
    return(
        <div>
            <div className="d-flex">
                <BiAddToQueue />
                <p onClick={() => setModalShow(true)}>Create an account</p>
                <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}/>
            </div>
            

        </div>
    );
}
export default MeterRead;