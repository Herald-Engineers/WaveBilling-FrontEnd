import React, { useState,useEffect } from 'react';
import '../Admin/MeterReader.css';
import {BiAddToQueue} from "react-icons/bi";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../Components/LoadingSpinner';
import AdminSidebar from '../Admin/AdminSidebar';
import MainBox from '../Admin/MainBoxes';
import MeterTable from '../Admin/MeterTable';
import  {FiEdit} from "react-icons/fi";    
import {MdDeleteOutline} from "react-icons/md"; 
import { Link } from 'react-router-dom';
import Edit from '../Image/edit.png';
import Delete from '../Image/delete.png';
function validatePhoneNumber(phoneNumber) {
    if (phoneNumber.length > 10) {
      return false; // Phone number is too long
    }
    return true; // Phone number is valid
  }
function submitAddReader(firstname, middlename, lastname, tel2,email,consumerType,id) {
    axios.patch('https://wavebilling-backend-sabinlohani.onrender.com/admin/edit-reader', {
      firstName: firstname,
      lastName: lastname,
      middleName: middlename,
      tel2: tel2,
      email: email,
      _id: id,
     
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

function handleApprove(approveId,consumerType) {
    const token = localStorage.getItem('token');
    const data = {
        _id: approveId,
        userType: consumerType
    };

    axios.post("https://wavebilling-backend-sabinlohani.onrender.com/admin/approve-user", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => { 
        console.log("successful");  
        console.log(response);
    }).catch(error => console.log(error.response.data));
};
function handleDelete2(deleteId2,consumerType2) {
    
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJyYW1lc2giLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWQiOiI2NDFhZmQ1ODJiMzYxZDI3ODY2NzRmNjEiLCJpYXQiOjE2ODI3ODAzODJ9.H8pIY8v5s4ZsIs5aekS77oRWsqh4P7toqVFHIRxZeOw";
    console.log(token);
    console.log(deleteId2);  
    console.log(consumerType2);  
    axios.delete("https://wavebilling-backend-sabinlohani.onrender.com/admin/reject-request",{
        _id: deleteId2,
        userType: consumerType2,
    },{
        headers: {
          Authorization: `Bearer ${token}`
        }
    }).then(response => { 
        // remove deleted row from tableData
        console.log(response.data)
       
      }).catch(error => console.log(error));
};
function UserTable(){
    const token = localStorage.getItem('token');
    const [show, setShow] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [reader, setReader] = useState(null);
    const [serverResponseReceived, setServerResponseReceived] = useState(false);
    const [loading, setLoading] = useState(false);  
    const [tel2Error, setTel2Error] = useState("");
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleClose3 = () => setShow3(false);
    const handleClose4 = () => setShow4(false);
    const handleClose5 = () => setShow5(false);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [tel2, setTel2] = useState("");
    const [email, setEmail] = useState("");
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const handleMiddleName = (event) => {
        setMiddleName(event.target.value);
    };
    const handleLastName = (event) => {
        setLastName(event.target.value);
    };
    const handleTel2 = (event) => {
        setTel2(event.target.value);
        if (!validatePhoneNumber(tel2)) {
          setTel2Error("Phone number must be 10 digits or less");
        } else {
          setTel2Error("");
        }
      };
    useEffect(() => {
        axios.get("https://wavebilling-backend-sabinlohani.onrender.com/admin/fetch-consumers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        setTableData(response.data);
      })
      .catch((error) => console.log(error));
      }, [reader]
    );
    const [editId, setEdit] = useState(null);
    const [approveId, setApproveId] = useState(null);
    const [consumerType, setConsumerType] = useState(null);
    const [consumerType2, setConsumerType2] = useState(null);
    const [consumerType3, setConsumerType3] = useState(null);
    const [consumerType4, setConsumerType4] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [emailError, setEmailError] = useState("");
    const [deleteId2, setDeleteId2] = useState(null);
    const [isValidEmail, setIsValidEmail] = useState(false);
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

    //delete function after approving
    const handleDelete = (_id,consumerType3) => {
        setLoading(true);
        setServerResponseReceived(false);
        console.log('The id is ' + _id);
        axios.delete(`https://wavebilling-backend-sabinlohani.onrender.com/admin/delete-user`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                _id,
                userType: consumerType3,
            }
        }).then((response) => {
            // remove deleted row from tableData
            console.log('The response is: ' + response);
            setServerResponseReceived(true);
            setLoading(false);
            setTableData(tableData.filter(row => row._id !== _id));
            console.log(`Deleted row with ID ${_id}`);
            handleClose();
        }).catch((error) => {
            console.log('The error is: ' + error);
            setServerResponseReceived(true);
            setLoading(false);
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.patch('https://wavebilling-backend-sabinlohani.onrender.com/admin/edit-reader', {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        tel2: tel2,
        email: email,
        _id: editId,
       
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(response => { 
          console.log("successful in edit profile of user table");  
          console.log(response);
          setServerResponseReceived(true);
          setLoading(false);
          setFirstName("");
          setLastName("");
          setMiddleName("");
          setTel2("");
          setEmail(""); 
        }).catch(error => console.log(error));
      };

        //delete function before approving
    // const handleDelete2 = (deleteId2,consumerType2) => {
    //     setLoading(true);
    //     setServerResponseReceived(false);
    //     console.log('The id is ' + deleteId2);
    //     axios.delete(`https://wavebilling-backend-sabinlohani.onrender.com/admin/reject-request`,{
    //         _id: deleteId2,
    //         userType: consumerType2,
    //     }, {
    //     headers: {
    //         Authorization: `Bearer ${token}`
    //     },
    //     data: {
    //         deleteId2,
    //         consumerType2,

    //     }
    //     })
    //     .then((response) => {
    //         // remove deleted row from tableData
    //         setServerResponseReceived(true);
    //         setLoading(false);
    //         setTableData(tableData.filter(row => row._id !== deleteId2));
    //         console.log(`Deleted row with ID ${deleteId2}`);
    //         handleClose3();
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         setServerResponseReceived(true);
    //         setLoading(false);
    //     });
    //     };
    const [filteredData, setFilteredData] = useState(tableData);
    const [searchValue, setSearchValue] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    
    const handleSearch = () => {
        if (searchValue === '') {
          setIsSearching(false);
        } else {
          setIsSearching(true);
          const filteredData = tableData.filter((row) => row.userId.includes(searchValue));
          setSearchResults(filteredData);
        }
      };
          const handleInputChange = (event) => {
            setSearchValue(event.target.value);
          };
    


    return(
        
            <div>
                <div className='containerHome'>
                    <div className='left-left-nav'>
                        <AdminSidebar/>
                    </div>
                
                
                    <div className='right-right-nav-Home2'>
                        <div>
                            <MainBox />
                        </div>
                        <div className="d-flex ">
                        
                          <div className='myTables meter-table'style={{ width: '1200px', overflowX: 'scroll' }}>
                            <div style={{marginBottom:'60px',textAlign:'center',marginLeft: '300px'}}>
                                    <center><h4 style={{position:'fixed',marginBottom:'40px'}} >Kulekhani Upatyaka Khanepani Limited <span style={{color:'#0A83F0',fontFamily:'Montserrat',fontStyle:'normal',fontWeight:'700'}}>(Users)</span></h4></center>
                                </div>  
                             
                                <div style={{position: 'fixed', width: '100%'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', maxWidth: '400px', marginLeft: '366px'}}>
                                        <input type="text" placeholder="Search User ID" value={searchValue} onChange={handleInputChange} onKeyUp={handleSearch} style={{flex: 1, marginRight: '10px', padding: '5px',width:'100px',height:'35px'}} />
                                        <Button onClick={handleSearch} style={{width:'100px',height:'35px',margin:'8px 0px'}}>Search</Button>
                                    </div>
                                </div>

                        <div style={{marginTop:'144px', marginLeft: '40px',marginRight: '40px',height:'282px', overflowX: 'scroll'}}>
                        
                            <table className="table table-striped meterReader-table2 outer-border" style={{width:'2500px',overflowX:'scroll'}}> 
                                <thead>
                                <tr>
                                    <th style={{ width: '300px' }}>Name</th>
                                    <th style={{ width: '300px' }}>User Id</th>
                                    <th style={{ width: '300px' }}>Meter No</th>
                                    <th style={{ width: '300px' }}>Contact No</th>
                                    <th style={{ width: '300px' }}>Email</th>
                                    <th style={{ width: '300px' }}>Address</th>
                                    <th style={{ width: '300px' }}>Payment Status</th>
                                    <th style={{ width: '300px' }}>Action</th>

                                </tr>
                                </thead>
                                <tbody>
                                {isSearching ? (
                                    searchResults.map((row) => (
                                        <tr key={row._id}>
                                            <td>{row.fullName}</td>
                                            <td>{row.userId?row.userId:'-'}</td>
                                            <td>{row.meterNo?row.meterNo:'-'}</td>
                                            <td>{row.contactNum}</td>
                                            <td>{row.email}</td>
                                            <td>{row.address}</td>
                                            <td>{row.paymentStatus ? (row.paymentStatus === true ? 'Paid' : 'Pending') : '-'}</td>

                                            
                                            <td>{row.meterNo ? <p><FiEdit size={18} className="edit-icon" onClick={() => {
                                                setEdit(row._id); setConsumerType4(row.consumerType);
                                                setShow4(true); }}/> <MdDeleteOutline size={21} alt="Delete Meter Reader" className="delete-icon" onClick={() => {
                                                setDeleteId(row._id); setConsumerType3(row.consumerType);
                                                setShow(true); }}/></p>: <p><span onClick={() => {setApproveId(row._id); setConsumerType(row.consumerType);
                                                setShow2(true);
                                            }} style={{color:'#2F4858',marginRight:'20px'}}>Approve</span> <span  style={{color:'#9F4040', borderBottom:'1px solid #9F4040'}} onClick={() => {
                                                setDeleteId2(row._id); setConsumerType2(row.consumerType);
                                                setShow3(true);
                                            }}>Delete</span></p>}</td> 
                                        </tr>
                                    ))
                                    ) :(
                                        tableData.map((row) => (
                                        <tr key={row._id}>
                                            <td>{row.fullName}</td>
                                            <td>{row.userId?row.userId:'-'}</td>
                                            <td>{row.meterNo?row.meterNo:'-'}</td>
                                            <td>{row.contactNum}</td>
                                            <td>{row.email}</td>
                                            <td>{row.address}</td>
                                            <td className={row.paymentStatus ? (row.paymentStatus === true ? 'paid' : 'pending') : 'none'}>
                                              {row.paymentStatus ? (row.paymentStatus === true ? 'Paid' : 'Pending') : '-'}
                                            </td>

                                            
                                            <td>{row.meterNo ? <p><FiEdit size={18} className="edit-icon" onClick={() => {
                                                setEdit(row._id); setConsumerType4(row.consumerType);
                                                setShow4(true); }}/> <MdDeleteOutline size={21} alt="Delete Meter Reader" className="delete-icon" onClick={() => {
                                                setDeleteId(row._id); setConsumerType3(row.consumerType);
                                                setShow(true); }}/></p>: <p><span onClick={() => {setApproveId(row._id); setConsumerType(row.consumerType);
                                                setShow2(true);
                                            }} style={{color:'#2F4858',marginRight:'20px'}}>Approve</span> <span  style={{color:'#9F4040', borderBottom:'1px solid #9F4040'}} onClick={() => {
                                                setDeleteId2(row._id); setConsumerType2(row.consumerType);
                                                setShow3(true);
                                            }}>Delete</span></p>}</td> 
                                            
                                        </tr>
                                    ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                         </div>
                        </div>
                        
                        
                    </div>
                </div>
                <Modal  show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className='DeletePopOver'>
                    <Modal.Body style={{padding:'68px',backgroundColor:'#D9D9D9'}}>
                        <center><span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}> Are you sure?</span></center>
                        <div className='justify-content-center main-box2  '>
                            <Button className='meterButtons2' type='submit' value="submit" onClick={() => handleDelete(deleteId,consumerType3)} >Delete</Button><br/><br/>
                            <Button onClick={handleClose} className='meterButtons'>Go Back</Button><br/>
                            {loading && !serverResponseReceived && <LoadingSpinner />}
                        </div>
                    </Modal.Body>
                </Modal>

                {/* approve delete */}
                <Modal  show={show3} onHide={handleClose3} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className='DeletePopOver'>
                    <Modal.Body style={{padding:'68px',backgroundColor:'#D9D9D9'}}>
                        <center><span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}> Are you sure?</span></center>
                        <div className='justify-content-center main-box2  '>
                            <Button className='meterButtons2' type='submit' value="submit" onClick={() => handleDelete2(deleteId2,consumerType2)} >Delete</Button><br/><br/>
                            <Button onClick={handleClose3} className='meterButtons'>Go Back</Button><br/>
                            {loading && !serverResponseReceived && <LoadingSpinner />}
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal  show={show2} onHide={handleClose2} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className='DeletePopOver'>
                    <Modal.Body style={{padding:'68px',backgroundColor:'#D9D9D9'}}>
                        <center><span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}> Are you sure?</span></center>
                        <div className='justify-content-center main-box2  '>
                            <Button className='meterButtons2' type='submit' value="submit" onClick={() => handleApprove(approveId, consumerType)} >Approve</Button><br/><br/>
                            <Button onClick={handleClose2} className='meterButtons'>Go Back</Button><br/>
                            {loading && !serverResponseReceived && <LoadingSpinner />}
                        </div>
                    </Modal.Body>
                </Modal>
                
            {/* for edit */}
            <Modal  show={show4} onHide={handleClose4} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Body style={{padding:'68px',backgroundColor:'#D9D9D9'}}>
          <center><span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}>Edit Your Account</span></center>
          <div className='main-box  text-center'>
            <p>Please enter the User ID and temporary password for the User.</p><br/>
            <form  onSubmit={(event) => handleSubmit( event)}>
              <div className='meter-Table'>
                <table>
                  <tbody>
                    <tr>
                      <td>First Name: </td>
                      <td><input type="text" name="firstName" placeholder="Enter full name"  value={firstName}  className='meter-Table2' onChange={handleFirstName} required/></td>
                    </tr>
                    {/* <tr>
                      <td>{fullnameError && <div className="error" style={{ color: 'red' }}>{fullnameError}</div>}</td>
                    </tr> */}
                    <tr>
                      <td>Middle Name: </td>
                      <td><input type="text" name="middleName" placeholder="Enter middle name"  value={middleName} onChange={handleMiddleName} required/></td>
                    </tr>
                    <tr>
                      <td>Last Name: </td>
                      <td><input type="text" name="lastName" placeholder="Enter last name"  value={lastName} onChange={handleLastName} required/></td>
                    </tr>
                    <tr>
                      <td>Mobile No:</td>
                      <td><input type="text" name="tel2" placeholder="Enter Contact No"  value={tel2} onChange={handleTel2} required/></td>
                      
                    </tr>
                    <tr>
                      <td>{tel2Error && <div className="error" style={{ color: 'red' }}>{tel2Error}</div>}</td>
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
              <Button onClick={handleClose4} className='meterButtons'>Go Back</Button>
              <Button className='meterButtons2' type='submit' value="submit"  onClick={() => {
                
                  submitAddReader(firstName, middleName, lastName,tel2,email,consumerType4,editId);
                 
                
              }}>  Submit</Button>
              
              {loading && !serverResponseReceived && <LoadingSpinner />}
            </form>        
          </div>
        </Modal.Body>
      </Modal>


      
    
            </div>
        );
    
}
export default UserTable;
