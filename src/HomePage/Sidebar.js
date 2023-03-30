import React from 'react';
import { Nav } from 'react-bootstrap';
import MyImage2 from '../Image/logo123.png';
import { Link } from 'react-router-dom';
import '../Css/Sidebar.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import DashboardIcon from '../Image/PayBill.png';
import DashboardIcon2 from '../Image/dashboard.png';
import  { TbDashboard } from "react-icons/tb";
import  { TbCalendarTime } from "react-icons/tb";
import {RiAccountPinCircleLine} from "react-icons/ri";
import {FiSettings} from "react-icons/fi";
import {RiArrowGoBackFill} from "react-icons/ri";
function Sidebar(){
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
                                <TbDashboard size={27}/>
                                <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px'}} className="myfontcolor">Dashboard</p> 
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/bollhistory' active={activeLink === 'billhistory'} onClick={() => setActiveLink('billhistory')} className='sidebar-fonts sidebar-link' >
                            <div className='d-flex'>
                                {/* <img src={DashboardIcon2} alt="Wave Billing System" className="" />  */}
                                <TbCalendarTime  size={18} style={{paddingTop:'2px'}}/>
                                <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px'}} className="myfontcolor">My Bills</p> 
                            </div>
                        </Nav.Link>

                        <Nav.Link as={Link} to='/billHistory' active={activeLink === 'billhistory'} onClick={() => setActiveLink('billhistory')}  className='sidebar-fonts sidebar-link'>
                        {/* <img src={DashboardIcon} alt="Wave Billing System" className="" /> <br/> */}
                        
                            <div className='d-flex'>
                                <RiAccountPinCircleLine  size={18} style={{paddingTop:'2px'}}/>
                                <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px'}} className="myfontcolor">My History</p> 
                            </div>
                    </Nav.Link>

                        <Nav.Link as={Link} to='/editprofile' active={activeLink === 'settings'} onClick={() => setActiveLink('settings')}  className='sidebar-fonts sidebar-link'>
                    
                            <div className='d-flex'>
                                    <FiSettings  size={18} style={{paddingTop:'2px'}}/>
                                    <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px'}} className="myfontcolor">My Profile</p> 
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to='/' active={activeLink === 'settings'} onClick={() => setActiveLink('settings')}  className='sidebar-fonts sidebar-link'>
                    
                            <div className='d-flex'>
                                    <RiArrowGoBackFill  size={18} style={{paddingTop:'2px'}}/>
                                    <p style={{fontSize: '16px', paddingLeft: '5px',margin: '0px'}} className="myfontcolor">Sign Out</p> 
                            </div>
                        </Nav.Link>
                    </Nav>
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