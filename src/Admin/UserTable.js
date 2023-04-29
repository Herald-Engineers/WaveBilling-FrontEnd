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
import { Link } from 'react-router-dom';
import Edit from '../Image/edit.png';
import Delete from '../Image/delete.png';

function handleApprove(approveId,consumerType) {
    const token = localStorage.getItem('token');
    console.log(consumerType);  
    console.log(approveId);  
    axios.post("https://wavebilling-backend-sabinlohani.onrender.com/admin/approve-user",{
        _id: approveId,
        userType: consumerType,
    },{
        headers: {
          Authorization: `Bearer ${token}`
        },
      
      data: {
          approveId,
          consumerType
      }
    }).then(response => { 
        console.log("successful");  
        console.log(response);
      }).catch(error => console.log(error));
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
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [reader, setReader] = useState(null);
    const [serverResponseReceived, setServerResponseReceived] = useState(false);
    const [loading, setLoading] = useState(false);  
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleClose3 = () => setShow3(false);
    const handleClose4 = () => setShow4(false);
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
    const [approveId, setApproveId] = useState(null);
    const [consumerType, setConsumerType] = useState(null);
    const [consumerType2, setConsumerType2] = useState(null);
    const [consumerType3, setConsumerType3] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteId2, setDeleteId2] = useState(null);

    //delete function after approving
    const handleDelete = (_id,consumerType3) => {
        setLoading(true);
        setServerResponseReceived(false);
        console.log('The id is ' + _id);
        axios.delete(`https://wavebilling-backend-sabinlohani.onrender.com/admin/delete-user`, {
            _id: _id,
            userType: consumerType3,
        },{
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            _id,
            consumerType3

        }
        })
        .then((response) => {
            // remove deleted row from tableData
            setServerResponseReceived(true);
            setLoading(false);
            setTableData(tableData.filter(row => row._id !== _id));
            console.log(`Deleted row with ID ${_id}`);
            handleClose();
        })
        .catch((error) => {
            console.log(error);
            setServerResponseReceived(true);
            setLoading(false);
        });
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
                            <div>
                                <center><h4>Kulekhani Upatyaka Khanepani Limited <span style={{color:'#0A83F0',fontFamily:'Montserrat',fontStyle:'normal',fontWeight:'700'}}>(Users)</span></h4></center>
                            </div>  

                        <div style={{ width: '2000px', overflowX: 'scroll' }}>
                            <table className="table table-striped meterReader-table outer-border"> 
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
                                    {tableData.map((row) => (
                                        <tr key={row._id}>
                                            <td>{row.fullName}</td>
                                            <td>{row.userId?row.userId:'-'}</td>
                                            <td>{row.meterNo?row.meterNo:'-'}</td>
                                            <td>{row.contactNum}</td>
                                            <td>{row.email}</td>
                                            <td>{row.address}</td>
                                            <td>{row.paymentStatus ? (row.paymentStatus === true ? 'Paid' : 'Pending') : '-'}</td>

                                            
                                            <td>{row.meterNo ? <p><img src={Edit} alt="Edit Consumer"/> <img src={Delete} alt="Delete Consumer" onClick={() => {
                                                setDeleteId(row._id); setConsumerType3(row.consumerType);
                                                setShow(true); }}/></p>: <p><span onClick={() => {setApproveId(row._id); setConsumerType(row.consumerType);
                                                setShow2(true);
                                            }} style={{color:'#2F4858',marginRight:'20px'}}>Approve</span> <span  style={{color:'#9F4040', borderBottom:'1px solid #9F4040'}} onClick={() => {
                                                setDeleteId2(row._id); setConsumerType2(row.consumerType);
                                                setShow3(true);
                                            }}>Delete</span></p>}</td> 
                                            
                                        </tr>
                                    ))}
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
                            <Button className='meterButtons2' type='submit' value="submit" onClick={() => handleApprove(approveId,consumerType)} >Approve</Button><br/><br/>
                            <Button onClick={handleClose2} className='meterButtons'>Go Back</Button><br/>
                            {loading && !serverResponseReceived && <LoadingSpinner />}
                        </div>
                    </Modal.Body>
                </Modal>
                
    
            </div>
        );
    
}
export default UserTable;
