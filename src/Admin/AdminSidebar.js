import React from 'react';
import { Nav } from 'react-bootstrap';
import MyImage2 from '../Image/logo123.png';
import { Link } from 'react-router-dom';
import '../Css/Sidebar.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import DashboardIcon from '../Image/PayBill.png';
import DashboardIcon2 from '../Image/dashboard.png';

import Button from 'react-bootstrap/Button';
import MyProfile from '../Image/MyProfile.png';
import  { TbDashboard } from "react-icons/tb";
import  { TbCalendarTime } from "react-icons/tb";
import {FiUser} from "react-icons/fi";
import {RiArrowGoBackFill} from "react-icons/ri";
import {TbMessageReport} from "react-icons/tb";
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        
            <Modal.Body style={{padding:'40px',backgroundColor:'#D9D9D9'}}>
                <center>
                <span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}>Are you sure you want to log out?</span></center>
                <div className='main-box text-center'>
            
                    <Link to="/">
                    <Button onClick="/" className='i-understand'>Confirm</Button></Link><br/><br/>
                    <Button onClick={props.onHide} className='myCancelButton'>Cancel</Button>
                </div>
            </Modal.Body>
       
        </Modal>
    );
}



function AdminSidebar(){
    
    const [modalShow, setModalShow] = React.useState(false);
    
    const links = document.querySelectorAll('.sidebar-link');

    links.forEach(link => {
      link.addEventListener('click', function() {
        console.log('Clicked!');
        links.forEach(link => link.classList.remove('active'));
        
        this.classList.add('active');
      });
    });
        const style={
            color: 'black',
            FontSize: '25px',
        }
        const location = useLocation();
      const [activeLink, setActiveLink] = useState(location.pathname);
    return (
        <div className="sidebar">
            <div className='sidebar-section text-center'>
                <Link to='/meterReader' className='navbar-brand'>
                    <img src={MyImage2} alt="Wave Billing System" className="my-specific-image" />
                </Link>
                <div style={{backgroundColor: 'transparent'}}>
                    <Nav className="flex-column ">
                        <Nav.Link as={Link} to='/meterReader' active={activeLink === 'admindashboard'} onClick={() => setActiveLink('meterReader')} className='sidebar-fonts-dashboard sidebar-link' >
                            <div className='d-flex dashbaord-image'>
                                {/* <img src={DashboardIcon2} alt="Wave Billing System" className="" />  */}
                                <TbDashboard size={18}/>
                                <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px',fontWeight:'600'}} className="myfontcolor">Dashboard</p> 
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/userTable' active={activeLink === 'user'} onClick={() => setActiveLink('admindashboard')} className='sidebar-fonts-user sidebar-link' >
                            <div className='d-flex'>
                                {/* <img src={DashboardIcon2} alt="Wave Billing System" className="" />  */}
                                <FiUser size={18}/>
                                <p style={{fontSize: '14px', paddingLeft: '5px',margin: '0px',paddingBottom:'15px'}} className="myfontcolor">Users</p> 
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/meterReader' active={activeLink === 'meterReader'} onClick={() => setActiveLink('admindashboard')} className='sidebar-fonts-meter sidebar-link' >
                            <div className='d-flex'>
                                {/* <img src={DashboardIcon2} alt="Wave Billing System" className="" />  */}
                                <FiUser size={18}/>
                                <p style={{fontSize: '14px', paddingLeft: '5px',margin: '0px'}} className="myfontcolor">Meter Reader</p> 
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/schedule' active={activeLink === 'billhistory'} onClick={() => setActiveLink('billhistory')} className='sidebar-fonts-dashboard sidebar-link' >
                            <div className='d-flex'>
                                {/* <img src={DashboardIcon2} alt="Wave Billing System" className="" />  */}
                                <TbCalendarTime  size={18} style={{paddingTop:'2px'}}/>
                                <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px',fontWeight:'600'}} className="myfontcolor">Schedule</p> 
                            </div>
                        </Nav.Link>

                        <Nav.Link as={Link} to='/issue' active={activeLink === 'issues'} onClick={() => setActiveLink('issues')}  className='sidebar-fonts sidebar-link'>
                        {/* <img src={DashboardIcon} alt="Wave Billing System" className="" /> <br/> */}
                        
                            <div className='d-flex'>
                                < TbMessageReport size={18} style={{paddingTop:'2px'}}/>
                                <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px',fontWeight:'600'}} className="myfontcolor">Issues</p> 
                            </div>
                        </Nav.Link>

                        <Nav.Link  active={activeLink === 'settings'} onClick={() => setActiveLink('settings')}  className='sidebar-fonts sidebar-link'>
                    
                            <div className='d-flex'>
                                    <RiArrowGoBackFill  size={18} style={{paddingTop:'2px'}}/>
                                    <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px',fontWeight:'600'}} className="myfontcolor" onClick={() => setModalShow(true)}>Sign Out</p> 
                            </div>
                        </Nav.Link> 
                        <Nav.Link  active={activeLink === 'settings'} onClick={() => setActiveLink('settings')}  className='sidebar-fonts sidebar-link'>
                    
                            <div className='' style={{bottom:'0',position:'absolute',paddingBottom:'10px'}}>
                                <img src={MyProfile} alt="Profile Picture" className="myProfilePic" /> <br/>
                                <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px',fontWeight:'600'}} className="myfontcolor">Sugam Paudyal</p>
                                <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px',fontWeight:'300'}} className="">Admin</p> 
                            </div>
                        </Nav.Link>
                    </Nav>
                    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
                </div>
            </div>
            
        </div>
    )
}
export default AdminSidebar;
// as={Link} to='/'