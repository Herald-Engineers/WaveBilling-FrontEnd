import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import '../App.css';
import '../Components/form.css';
import '../Components/SmallLogo.css';
import { Link } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import '../NavbarFolders/LandingNav.css'; 
import Dropp from '../NavbarFolders/dropdown';
import MyImage from '../Image/logo123.png';

function NavbarHomePage() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  
  return (
    <div className='navbar-wrapper full-width'>
  
    <Nav className='nav_pills nav_justified navbar-links'>
      
      {/* <NavItem>
            <Nav.Link  as={Link} to='/homela' active={activeLink === 'services'} onClick={() => setActiveLink('services')}>
            My Home
            </Nav.Link>
      </NavItem> */}
      
       
      <NavItem className=''>
       
       <Dropp/>
       
      </NavItem>
    </Nav>
 
</div>

  );
}

export default NavbarHomePage;

