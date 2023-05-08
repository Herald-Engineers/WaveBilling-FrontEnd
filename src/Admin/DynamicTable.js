import React from 'react';
import { useState } from 'react';
import { useEffect } from "react";
import LoadingSpinner from '../Components/LoadingSpinner';
import axios from 'axios';
import '../Admin/MeterReader.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import  {FiEdit} from "react-icons/fi";    
import {MdDeleteOutline} from "react-icons/md";
import { Link } from 'react-router-dom';
import { MdVerified } from "react-icons/md"; 


function MyVerticallyCenteredModal(props) {

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered  >

      <Modal.Body style={{ padding: '68px', backgroundColor: '#D9D9D9' }}>
        <center>
          <MdVerified size={40} style={{ color: 'green' }} /><br />
          <span style={{ color: '#32325D', fontSize: '30px', fontWeight: '700' }}>The data you’ve entered has <br/>been submitted successfully.</span></center>
        <div className='main-box text-center'>

          
          <Link to='/meterReader'><Button onClick={props.onHide} className='i-understand'>Continue</Button></Link>
        </div>
      </Modal.Body>

    </Modal>
  );
}



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
     
      console.log("successful Submit add reader");  
      console.log(response);
      // window.location.reload();
    }).catch(error => console.log(error.response.data));
};

function validatePhoneNumber(phoneNumber) {
  if (phoneNumber.length !== 10) {
    return false; // Phone number is too long
  }
  return true; // Phone number is valid
}

function DynamicTable(){
  const [editId, setEditId] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const token = localStorage.getItem('token');
  const [fullName, setFullname] = useState("");
  const [readerId, setReaderId] = useState("");
  const [contactNum, setContact] = useState("");
  const [email, setEmail] = useState("");
 
  const [myModalShow2, setMyModalShow2] = useState(false);
  
  const [serverResponseReceived, setServerResponseReceived] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleClose4 = () => setMyModalShow2(false);
  const [tel1Error, setTelError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullnameError, setFullNameError] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [MyModalShow, setMyModalShow] = React.useState(false);
  const handleShow = () => {
    
    setMyModalShow2(true);
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
  
  const handleFullName = (event) => {
    const FullNameValue = event.target.value;
      setFullname(FullNameValue);
      const regex = /^[a-zA-Z]+(?: [a-zA-Z]+){0,2}$/;
      if (!regex.test(FullNameValue)) {
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
 
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.patch('https://wavebilling-backend-sabinlohani.onrender.com/admin/edit-reader', {
    fullName: fullName,
    readerId: readerId,
    contactNum: contactNum,
    email: email,
    _id: editId,
   
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
    }).catch(error => console.log(error.response.data));
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
    const [filteredData, setFilteredData] = useState(tableData);
    const [searchValue, setSearchValue] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    
    const handleSearch = () => {
        if (searchValue === '') {
          setIsSearching(false);
        } else {
          setIsSearching(true);
          const filteredData = tableData.filter((row) => row.fullName.includes(searchValue));
          setSearchResults(filteredData);
        }
      };
          const handleInputChange = (event) => {
            setSearchValue(event.target.value);
          };


  return (
    <>
      <div style={{position: 'fixed', width: '100%'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '400px', marginLeft: '366px'}}>
            <input type="text" placeholder="Search Fullname" value={searchValue} onChange={handleInputChange} onKeyUp={handleSearch} style={{flex: 1, marginRight: '10px', padding: '5px',width:'100px',height:'35px'}} />
            <Button onClick={handleSearch} style={{width:'100px',height:'35px',margin:'8px 0px'}}>Search</Button>
        </div>
      </div>
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
          {isSearching ? (searchResults.map((row) => (
            <tr key={row._id}>
              <td>{row.fullName}</td>
              <td>{row.email}</td>
              <td>{row.contactNum}</td>
              <td>
                <form >
                  <FiEdit size={18} className="edit-icon" onClick={() => {
                    setEditId(row._id);
                    setShow(true);
                  }}/>
                  <MdDeleteOutline size={21} alt="Delete Meter Reader" className="delete-icon" onClick={() => {
                    setDeleteId(row._id);
                    setShow2(true);
                  }} />
                </form> 
              </td>
            </tr>
             ))
          ) :(
          tableData.map((row) => (
            <tr key={row._id}>
              <td>{row.fullName}</td>
              <td>{row.email}</td>
              <td>{row.contactNum}</td>
              <td>
                <form >
                  <FiEdit size={18} alt="Edit Meter Reader" className="edit-icon" style={{marginRight:'6px'}} onClick={() => {
                    setEditId(row._id);
                    setShow(true);
                  }}/>
                  <MdDeleteOutline size={21} alt="Delete Meter Reader" className="delete-icon" onClick={() => {
                    setDeleteId(row._id);
                    setShow2(true);
                  }} />
                </form> 
              </td>
            </tr>
          ))
          )}  {/*Table Data end*/}
        </tbody>
      </table>

      <Modal  show={show2} onHide={handleClose2} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className='DeletePopOver'>
        <Modal.Body style={{padding:'68px',backgroundColor:'#D9D9D9'}}>
          <center><span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}> Are you sure?</span></center>
          <div className='justify-content-center main-box2  '>
            <Button className='meterButtons2' type='submit' value="submit"  onClick={() => handleDelete(deleteId)}>Delete</Button><br/><br/>
            <Button onClick={handleClose2} className='meterButtons'>Go Back</Button><br/>
           
          </div> 
          <div className='text-center'>{loading && !serverResponseReceived && <LoadingSpinner />}</div>
        </Modal.Body>
      </Modal>
    
      <Modal  show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Body style={{padding:'68px',backgroundColor:'#D9D9D9'}}>
          <center><span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}>Edit Your Account</span></center>
          <div className='main-box  text-center'>
            <p>Please enter the Reader ID and temporary password for the Reader.</p><br/>
            <form  onSubmit={(event) => handleSubmit(event)}>
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
                  handleShow(true);
                  handleClose();
                 
                }
              }}>  Submit</Button>
              
              
            </form>      
          </div>
        </Modal.Body>
      </Modal>


      <Modal  show={myModalShow2} onHide={handleClose4} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className='DeletePopOver'>
        <Modal.Body style={{padding:'68px',backgroundColor:'#D9D9D9'}}>
          <center><span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}> Completed successfully</span></center>
          <div className='justify-content-center main-box2  '>
           
          <Button onClick={handleClose4} className='meterButtons'>Continue</Button><br/>
           
          </div> 
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DynamicTable;