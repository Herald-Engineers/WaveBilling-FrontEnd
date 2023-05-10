import React , { useState,useEffect }from 'react';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';
import {Link} from  'react-router-dom'; 
import Khalti from '../Image/khalti.png';
import Esewa from '../Image/esewa.png';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function PayNow(){
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.id;
    console.log("Pay Now Id: ",id);

    function handleViewClick(paymentMethod){
        // Render the ViewDetails component
        navigate("/confirmPayment", { state: { id,paymentMethod } });
    };
    function handleView(){
        // Render the ViewDetails component
        navigate("/viewDetails", { state: { id } });
    };
      
    function handleNextClick(id) {
        // Get the selected payment method
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    
        // Otherwise, proceed to the next page
         handleViewClick(paymentMethod.value);
    }
    
    
    return(
        <div className='containerHome'>
            <div className='left-left-nav'>
                <Sidebars/>
            </div>
            <div className='right-right-nav-Home'>
                <div className=''>
                    <Nav/>
                </div>
                
                <div className='' id='payNowPage'>
                    <center><h2 style={{color:'#2F4858',marginTop:'30px'}}>Pay for your bill</h2></center>
                    <div className='Pay-section'>
                        <div className='PaySectionPlease'>
                            <center>
                                <p>Choose Your payment option:</p>
                                <form>                               
                                    <div className='d-flex '>
                                        <div className='pay-now-1'>
                                            <input class="form-check-input" type="radio" name="paymentMethod" value="khalti" id="khalti-method" required/>
                                            <label for="khalti-method">
                                                <img src={Khalti} alt="logout" className="logoImage" />
                                            </label>
                                        </div>
                                        <div className='pay-now-2'>
                                            <input class="form-check-input" type="radio" name="paymentMethod" value="esewa" id="esewa-method" required/>
                                            <label for="esewa-method">
                                                <img src={Esewa} alt="logout" className="logoImage" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className='buttonAlign'> 
                                        <button className='btn btn-secondary' onClick={() => handleView()}>Back</button>
                                        <button className='btn btn-primary nextButton' onClick={() => handleNextClick(id)} >Next</button>
                                    </div> 
                                </form>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PayNow;