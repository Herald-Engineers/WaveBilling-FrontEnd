import MyAdmin from '../Admin/AdminSidebar';
import React from 'react';
import  '../HomePage/Homepage.css';
import  '../Admin/AdminDash.css';
import  '../Components/SmallLogo.css';
import {  useState, useEffect} from 'react';
import axios from 'axios';
import ViewSchedule from '../Admin/ViewSchedule';

import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../Components/LoadingSpinner';
import { MdVerified } from "react-icons/md";
import Calendar from '../Image/Calendar.png';


function MyVerticallyCenteredModal(props) {

    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered  >
  
        <Modal.Body style={{ padding: '68px', backgroundColor: '#D9D9D9' }}>
          <center>
            <MdVerified size={40} style={{ color: 'green' }} /><br />
            <span style={{ color: '#32325D', fontSize: '30px', fontWeight: '700' }}>The data you’ve entered has <br/>been submitted successfully.</span></center>
          <div className='main-box text-center'>
  
            
            <Link to='/schedule'><Button onClick={props.onHide} className='i-understand'>Continue</Button></Link>
          </div>
        </Modal.Body>
  
      </Modal>
    );
}
function Schedule(){
    const token = localStorage.getItem('token');
    const [tableData, setTableData] = useState([]);
    const [reader, setReader] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);
    const [serverResponseReceived, setServerResponseReceived] = useState(false);
    const [loading, setLoading] = useState(false);

    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [address3, setAddress3] = useState("");
    const [address4, setAddress4] = useState("");
    const [address5, setAddress5] = useState("");
    const [date, setDate] = useState("");
   
   
    const handleAddress1 = (event) => {
        setAddress1(event.target.value);
    };
    const handleAddress2 = (event) => {
        setAddress2(event.target.value);
    };
    const handleAddress3 = (event) => {
        setAddress3(event.target.value);
    };
    const handleAddress4 = (event) => {
        setAddress4(event.target.value);
    }
    const handleAddress5 = (event) => {
        setAddress5(event.target.value);
    }
    const handleDate = (event) => {
        setDate(event.target.value);
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("hello");
        const data = {
            address1: address1,
            address2: address2,
            address3: address3,
            address4: address4,
            address5: address5,
            date: date,
            shift: event.target.shift.value,
            readerId: event.target.assignedTo.value,

        };
        axios.post("https://wavebilling-backend-sabinlohani.onrender.com/admin/add-schedule", data , 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
            setServerResponseReceived(true);
            setLoading(false);
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);

        });
      };

   
    useEffect(() => {
        axios.get("https://wavebilling-backend-sabinlohani.onrender.com/admin/fetch-readers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => setTableData(response.data))
      .catch((error) => console.log(error));
      }, [reader]);

    return (
        <div>
            <div className='containerHome'>
                <div className='leftnav'>
                    <MyAdmin/>
                </div>
           
                <div className='justify-content-center right-right-nav-Home2'>
                    <div className='justify-content-center right-width '>
                        <div className='d-flex justify-content-center headingBorder' style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                            <div>
                                <img src={Calendar} alt="Schedule" className="" style={{width: '30px',height: '30px',left: '873px',top: '207px'}}/>
                               
                            </div>
                            <div>
                                 <h4 className='text-center'style={{color:'#2F4858',height:'37px',fontWeight:'600'}}>Add Schedule</h4>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='d-flex justify-content-center' style={{paddingTop:'45px'}}>
                                <div>
                                    <div style={{paddingRight:'20px'}}>
                                        <label>Address</label><br/>
                                        <input type="text" name="address1" placeholder="Enter Address 1" className='inputBox' onChange={handleAddress1} required value={address1}/><br/>
                                        <input type="text" name="address2" placeholder="Enter Address 2" className='inputBox' onChange={handleAddress2}/><br/>
                                        <input type="text" name="address3" placeholder="Enter Address 3" className='inputBox' onChange={handleAddress3}/><br/>
                                        <input type="text" name="address4" placeholder="Enter Address 4" className='inputBox' onChange={handleAddress4}/><br/>
                                        <input type="text" name="address5" placeholder="Enter Address 5" className='inputBox' onClick={handleAddress5}/><br/>

                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label>Date</label><br/>
                                        <input type="date" name="date" placeholder="Enter Date" className='inputBox' onChange={handleDate} value={date} required /><br/>

                                        <label>Shift</label><br/>
                                        <select className='inputBox' name='shift'>
                                            <option>Select the type of shift </option>
                                            <option value="Morning">Morning</option>
                                            <option value="Afternoon"> Afternoon</option>
                                            <option value="Evening">Evening</option>

                                        </select>
                                        <br/>
                                        <label>Assigned to:</label><br/>

                                       
                                        <select className='inputBox' name='assignedTo'>
                                        <option>Enter the name of the reader</option>
                                            {tableData.map((row) => (
                                        <option key={row._id} value={row._id}>
                                        {row.fullName}
                                        
                                        </option>
                                       
                                      
                                    ))}
                                   
                                    </select>
                                    </div>

                                </div>
                            </div>
                            <input type="submit" value="Save and Submit" id='submitSchedule' onClick={() => setModalShow(true)}/>
                        </form>
                        {loading && !serverResponseReceived && <LoadingSpinner />}
                        {serverResponseReceived ? (
                            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
                        ) : null}
                    </div>
                    <ViewSchedule />  
                
                </div> 
            </div>
        </div>
    )
}
export default Schedule;