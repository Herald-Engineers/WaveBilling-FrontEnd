import React from 'react';
import { Nav } from 'react-bootstrap';
import MyImage2 from '../Image/logo123.png';
import { Link } from 'react-router-dom';
import '../Css/Sidebar.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DashboardIcon from '../Image/PayBill.png';
import DashboardIcon2 from '../Image/dashboard.png';
import  { TbDashboard } from "react-icons/tb";
import  { TbCalendarTime } from "react-icons/tb";
import {RiArrowGoBackFill} from "react-icons/ri";
import {FiUser} from "react-icons/fi";
import {TbMessageReport} from "react-icons/tb";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function MyVerticallyCenteredModal(props) {

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>

            <Modal.Body style={{padding:'40px',backgroundColor:'#D9D9D9'}}>
                <center>
                <span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}>Are you sure you want to log out?</span></center>
                <div className='main-box text-center'>

                    <Link to="/login">
                        <Button  className='i-understand' onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('fullName');
                        }}>Confirm</Button>
                    </Link><br/><br/>
                    <Button onClick={props.onHide} className='myCancelButton'>Cancel</Button>
                </div>
            </Modal.Body>

        </Modal>
    );
}

function Sidebar(){
    const [modalShow, setModalShow] = React.useState(false);
    const links = document.querySelectorAll('.sidebar-link');
    const navigate = useNavigate();

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
    const [role, setRole] = useState('');
    const [profileLinkClicked, setProfileLinkClicked] = useState(false);

    useEffect(() => {
        if (profileLinkClicked) {
            const role = localStorage.getItem('role');
            if (role === 'companyConsumer') {
              navigate('/editProfile');
            } else {
              navigate('/profileIndividual');
            }
          }
    }, [profileLinkClicked]);
    return(
        <div className="sidebar">
            <div className='sidebar-section text-center'>
                <Link to='/homela' className='navbar-brand'>
                    <img src={MyImage2} alt="Wave Billing System" className="my-specific-image" />
                </Link>
                <div style={{backgroundColor: 'transparent'}}>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to='/homela' active={activeLink === 'dashboard'} onClick={() => setActiveLink('dashboard')} className='sidebar-fonts sidebar-link' >
                            <div className='d-flex'>
                                {/* <img src={DashboardIcon2} alt="Wave Billing System" className="" />  */}
                                <TbDashboard size={18}/>
                                <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px'}} className="myfontcolor">Dashboard</p> 
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/billhistory' active={activeLink === 'billhistory'} onClick={() => setActiveLink('billhistory')} className='sidebar-fonts sidebar-link' >
                            <div className='d-flex'>
                                {/* <img src={DashboardIcon2} alt="Wave Billing System" className="" />  */}
                                <TbCalendarTime  size={18} style={{paddingTop:'2px'}}/>
                                <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px'}} className="myfontcolor">Payment</p> 
                            </div>
                        </Nav.Link>

                        

                        <Nav.Link as={Link}  active={activeLink === 'profile'} onClick={() => {setActiveLink('profile'); setProfileLinkClicked(true);}}  className='sidebar-fonts sidebar-link'>
                    
                            <div className='d-flex'>
                                    <FiUser  size={18} style={{paddingTop:'2px'}}/>
                                    <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px'}} className="myfontcolor">My Profile</p> 
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/issueUser' active={activeLink === 'issueUser'} onClick={() => setActiveLink('issueUser ')}  className='sidebar-fonts sidebar-link'>
                    
                            <div className='d-flex'>
                                    < TbMessageReport size={18} style={{paddingTop:'2px'}}/>
                                    <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px'}} className="myfontcolor">Issues</p> 
                            </div>
                        </Nav.Link>
                        
                        <Nav.Link active={activeLink === 'settings'} onClick={() => setActiveLink('settings')}  className='sidebar-fonts sidebar-link'> 
                    
                            <div className='d-flex'>
                                    <RiArrowGoBackFill  size={18} style={{paddingTop:'2px'}}/>
                                    <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px'}} className="myfontcolor" onClick={() => { 
                                        setModalShow(true);
                                    }}>Sign Out</p> 
                            </div>
                        </Nav.Link>
                    </Nav>
                    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
                </div>
            </div>
            
        </div>
    );
}
export default Sidebar;



{/* <Nav className='nav_pills nav_justified navbar-links'>
      
      <NavItem>
            <Nav.Link  as={Link} to='/homela' active={activeLink === 'services'} onClick={() => setActiveLink('services')}>
            My Home
            </Nav.Link>
      </NavItem>
      
       
      <NavItem className=''>
       
       <Dropp/>
       
      </NavItem>
    </Nav> */}