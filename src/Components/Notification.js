import React from 'react';
import { FiBell } from 'react-icons/fi';
import {  useState,useEffect } from 'react';
import '../Css/Notification.css';
import axios from 'axios';
function NotificationIcon({ hasNotification }) {
  const [fullName, setFullName] = useState('');
  const [dueBy, setdueBy] = useState('');
  const [tableData, setTableData] = useState('');

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fullNameValue = localStorage.getItem('fullName');
    setFullName(fullNameValue);
  }, []);

  useEffect(() => {
    const dueDate = localStorage.getItem('dueBy');
    setdueBy(dueDate);
  }, []);
  useEffect(() => {
    axios.get("https://wavebilling-backend-sabinlohani.onrender.com/my-bills", {
      headers: {
        Authorization: `Bearer ${token}`

      }
    })
      .then((response) => { console.log('Bill response data: ' + response.data); setTableData(response.data) })
      .catch((error) => console.log(error.response.data));
  }, []);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  return (
    <div className="notification-icon-container">
        <span style={{textAlign:'right',color: '#2F4858',marginRight:'10px',fontSize:'22px'}}>Hi {fullName}</span>
          
            {/* {hasNotification && <div className="notification-dot"></div>} */}
             

            <div class="dropdown">
               <FiBell className="notification-icon" size={30} style={{color:'#2F4858',   marginBottom: '10px'}} onClick={() => myFunction()} class="dropbtn"  />
              <div id="myDropdown" class="dropdown-content">
           Your upcomming due date is on {dueBy} 
              </div>
            </div> 
                                        
                                       
                                       
         
         
                             
          
     </div>
        
      
    
  );
}

export default NotificationIcon;