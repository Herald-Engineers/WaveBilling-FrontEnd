import React from 'react';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';

function ViewPaymentSuccess(){
  
    return(
        <div className='containerHome'>
      <div className='left-left-nav'>
        <Sidebars />
      </div>
      <div className='right-right-nav-Home'>
        <div className=''>
          <Nav />
        </div>
        
          
        <div className='success-message'>
          <div id=''>
            <p>
                <b><span style={{color:'green',marginBottom:'60px'}}>Paid Successfully</span></b>
                <p>You can check the details in history section and download it.</p>
                <p>
                  Thankyou!!
                </p>
            </p>
          </div>
          
          
        </div> 
       
      </div>
    </div>
    );
}
export default ViewPaymentSuccess;


