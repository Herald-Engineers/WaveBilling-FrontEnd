import React from 'react';
import { useState } from 'react';
import { useEffect } from "react";
import TableData from "./TableData";
import LoadingSpinner from '../Components/LoadingSpinner';
import axios from 'axios';
import '../Admin/MeterReader.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Edit from '../Image/edit.png';
import Delete from '../Image/delete.png';


let gId;
function submitAddReader(fullName, readerId, contactNum, email,editId) {
  axios.patch('https://wavebilling-backend-sabinlohani.onrender.com/admin/edit-reader', {
    fullName: fullName,
    readerId: readerId,
    contactNum: contactNum,
    email: email,
    _id: editId,
   
    }, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(response => { 
      console.log("successful");  
      console.log(response);
    }).catch(error => console.log(error));
};

function validatePhoneNumber(phoneNumber) {
  if (phoneNumber.length !== 10) {
    return false; // Phone number is too long
  }
  return true; // Phone number is valid
}

let gFullName, gReaderId, gContactNum, gEmail;

function DynamicTable(){
  const [editId, setEditId] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const token = localStorage.getItem('token');
  const [fullName, setFullname] = useState("");
  const [readerId, setReaderId] = useState("");
  const [contactNum, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const [tel1Error, setTelError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullnameError, setFullNameError] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
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
  
  const handleFullName = (event) => {
      setFullname(event.target.value);
      const regex = /^[a-zA-Z]+(?: [a-zA-Z]+){0,2}$/;
      if (!regex.test(fullName)) {
        setFullNameError("Please enter a valid name");
      }
      else{
        setFullNameError("");
      }
  };
  const handleReaderId = (event) => {
    setReaderId(event.target.value);
  };
  
  const handleEmail = (event) => {
    const emailValue = event.target.value;
    setEmail(event.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(emailValue));
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please entera valid email");
    } 
    else{
      setEmailError("");
    }
  };
  const [serverResponseReceived, setServerResponseReceived] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.patch('https://wavebilling-backend-sabinlohani.onrender.com/admin/edit-reader', {
    fullName: fullName,
    readerId: readerId,
    contactNum: contactNum,
    email: email,
    _id: "6425d769c56d58d9766079e2",
   
    }, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => { 
      console.log("successful");  
      console.log(response);
      setServerResponseReceived(true);
      setLoading(false);
      setFullname("");
      setReaderId("");
      setContact("");
      setEmail(""); 
    }).catch(error => console.log(error));
  };

  useEffect(() => {
    axios.get("https://wavebilling-backend-sabinlohani.onrender.com/admin/fetch-readers", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => setTableData(response.data))
    .catch((error) => console.log(error));
  }, []);

  const [deleteId, setDeleteId] = useState(null);
  const handleDelete = (_id) => {
    setLoading(true);
    setServerResponseReceived(false);
    console.log('The id is ' + _id);
    axios.delete(`https://wavebilling-backend-sabinlohani.onrender.com/admin/delete-reader`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        _id
      }
    })
    .then((response) => {
        // remove deleted row from tableData
        setServerResponseReceived(true);
        setLoading(false);
        setTableData(tableData.filter(row => row._id !== _id));
        console.log(`Deleted row with ID ${_id}`);
        handleClose2();
      })
      .catch((error) => {
        console.log(error);
        setServerResponseReceived(true);
        setLoading(false);
      });
    };


  return (
    <>
      <table className="table table-striped meterReader-table outer-border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row._id}>
              <td>{row.fullName}</td>
              <td>{row.email}</td>
              <td>{row.contactNum}</td>
              <td>
                <form onSubmit={handleSubmit}>
                  <img src={Edit} alt="Edit Meter Reader" className="" onClick={() => {
                    setEditId(row._id);
                    setShow(true);
                    // gId = row._id;
                    // gFullName = row.fullName;
                    // gReaderId = row.email;
                    // gContactNum = 
                    // gEmail = 
                  }}/>
                  <img src={Delete} alt="Delete Meter Reader" className="" onClick={() => {
                    setDeleteId(row._id);
                    setShow2(true);
                  }} />
                </form> 
              </td>
            </tr>
          ))}  {/*Table Data end*/}
        </tbody>
      </table>

      <Modal  show={show2} onHide={handleClose2} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className='DeletePopOver'>
        <Modal.Body style={{padding:'68px',backgroundColor:'#D9D9D9'}}>
          <center><span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}> Are you sure?</span></center>
          <div className='justify-content-center main-box2  '>
            <Button className='meterButtons2' type='submit' value="submit"  onClick={() => handleDelete(deleteId)}>Delete</Button><br/><br/>
            <Button onClick={handleClose2} className='meterButtons'>Go Back</Button><br/>
            {loading && !serverResponseReceived && <LoadingSpinner />}
          </div>
        </Modal.Body>
      </Modal>
    
      <Modal  show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Body style={{padding:'68px',backgroundColor:'#D9D9D9'}}>
          <center><span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}>Edit Your Account</span></center>
          <div className='main-box  text-center'>
            <p>Please enter the Reader ID and temporary password for the Reader.</p><br/>
            <form  onSubmit={(event) => handleSubmit( event)}>
              <div className='meter-Table'>
                <table>
                  <tbody>
                    <tr>
                      <td>Full Name: </td>
                      <td><input type="text" name="fullName" placeholder="Enter full name"  value={fullName}  className='meter-Table2' onChange={handleFullName} required/></td>
                    </tr>
                    <tr>
                      <td>{fullnameError && <div className="error" style={{ color: 'red' }}>{fullnameError}</div>}</td>
                    </tr>
                    <tr>
                      <td>Reader Id: </td>
                      <td><input type="text" name="readerId" placeholder="Enter Reader Id"  value={readerId} onChange={handleReaderId} required/></td>
                    </tr>
                    <tr>
                      <td>Contact No:</td>
                      <td><input type="text" name="contactNum" placeholder="Enter Contact No"  value={contactNum} onChange={handleContactNum} required/></td>
                      
                    </tr>
                    <tr>
                      <td>{tel1Error && <div className="error" style={{ color: 'red' }}>{tel1Error}</div>}</td>
                    </tr>
                    <tr>
                        <td>Email Address: </td>
                        <td><input type="text" name="email" placeholder="Enter Email"  value={email} onChange={handleEmail} required/></td>
                       
                    </tr>
                    <tr>
                      <td> {emailError &&<div className="error" style={{ color: 'red' }}>{emailError}</div>}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Button onClick={handleClose} className='meterButtons'>Go Back</Button>
              <Button className='meterButtons2' type='submit' value="submit"  onClick={() => {
                if(fullName=="" || readerId=="" || contactNum=="" || email==""){
                  setTelError("Phone number must be 10 digits or less");
                  
                }
                else if(!validatePhoneNumber(contactNum))
                {
                  setTelError("Phone number must be 10 digits or less");
                }
                else{
                  submitAddReader(fullName, readerId, contactNum, email,editId);
                 
                }
              }}>  Submit</Button>
              
              {loading && !serverResponseReceived && <LoadingSpinner />}
            </form>        
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DynamicTable;