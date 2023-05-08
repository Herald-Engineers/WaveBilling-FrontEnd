import '../Css/LandingPage.css';
import axios from 'axios';
import React, { useState } from 'react';
import Loader from './LoadingSpinner';

function Contact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNum, setContact] = useState("");
    const [queries, setQueries] = useState("");
    const 
    [telError,setTelError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastName = (event) => {
        setLastName(event.target.value);
    };
    
    const handleContactNum = (event) => {
        const phoneNumber = event.target.value;
        setContact(phoneNumber);
        const regex = /^[0-9]+$/; // regex pattern to match only digits
        if (!regex.test(phoneNumber)) {
        setTelError("Please enter numbers only");
        } else if (phoneNumber.length !== 10) {
        setTelError("Phone number must be 10 digits or less");
        } else {
        setTelError("");
        }
        
    };
    
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleQueries = (event) => {
        setQueries(event.target.value);
    };
    const handleSubmit = (event) => {
        const submitBtn = document.getElementById('contact-submit');
        submitBtn.disabled = true;
        setLoading(true);

        event.preventDefault();
        axios.post("https://wavebilling-backend-sabinlohani.onrender.com/contact-wavebilling", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            contactNum: contactNum,
            queries: queries
        })
        .then(res => {
            submitBtn.disabled = false;
            setLoading(false);

            alert(res.data.message);
            console.log(res.data);
            // Redirect to the user's dashboard or some other page
        })
        .catch(error => {
            setLoading(true);
            console.log(error);
        });
    };
    
    return(
        <div className='form-section'> 
            <form onSubmit={handleSubmit}>             
                <div className='d-flex '>
                    <div className='line_space'>
                        <label>First Name</label><br></br>
                        <input type="text" placeholder="First Name" className='input_name' value={firstName} required onChange={handleFirstName}/><br></br>
                        <label>Email</label><br></br>
                        <input type="text" placeholder="Email Address" className='input_name' value={email} required onChange={handleEmail}/>
                    </div>

                    <div className=''>
                        <label>Last Name</label><br></br>
                        <input type="text" placeholder="Last Name" className='input_name' value={lastName} required onChange={handleLastName}/><br></br> 
                        <label>Phone Number</label><br></br>
                        <input type="text" placeholder="Phone Number" className='input_name' value={contactNum} required onChange={handleContactNum}/>
                        {telError && <div className="error" style={{ color: 'red' }}>{telError}</div>}
                    </div> 
                </div>
                <div className='line_space'>
                    <p >Queries</p>
                    <textarea name="queries" id="queries" cols="60" rows="10" className='input_name' value={queries}onChange={handleQueries} /><br>
                    </br> <input id='contact-submit' type="submit" value="Submit" />
                    {loading && <Loader />}
                </div>
            </form>
        </div>
    );
}
export default Contact;