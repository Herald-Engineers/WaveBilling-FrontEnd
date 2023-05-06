import axios from 'axios';
import React, { useState } from 'react';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';
import '../Css/EditProfile.css';    


function UserIssue(){
    const [queries, setQueries] = useState("");
    const [subject, setSubject] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const handleQueries = (event) => {
        setQueries(event.target.value);
    };
    const handleSubject = (event) => {
        setSubject(event.target.value);
    };
    const handleSubmit = (event) => {
        const submitBtn = document.getElementById('contact-submit');
        submitBtn.disabled = true;
        setLoading(true);

        event.preventDefault();
        axios.post("https://wavebilling-backend-sabinlohani.onrender.com/submit-issue", {
            
            
            subject: subject,
            issue: queries,
        },
        {
            headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
            },
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
       
       
        <div className='containerHome'>
            <div className='left-left-nav'>
                <Sidebars/>
            </div>
            <div className='right-right-nav-Home'>

            <div className=''>
                <Nav/>
            </div>
            
            <div className='' id='UserIssue'>
                <div className='d-flex'>
                    <div className='changeSection'>
                        <div className='my-issue'>
                            
                            <h1>Report An Issue</h1>
                            
                            
                            <form onSubmit={handleSubmit}>
                                <table>
                                    <tr>
                                        <td >Subject: </td>
                                        
                                    </tr>
                                    <tr>
                                        <input type='text' placeholder='Enter your issue' name="subject"onChange={handleSubject} className='MySubject' required/>
                                    </tr>
                                   
                                </table>
                                <br/>
                                <p>Details:</p>
                                <textarea name="queries" id="queries" cols="60" rows="10" className='input_name' placeholder="Explain your issue"value={queries} onChange={handleQueries} required /><br/>
                                <input type='submit' className='IssueSubmit'/>
                            </form>
                        </div>
                            
                    </div>
                </div >       
            </div>

        </div>
    </div>
    )
}
export default UserIssue;