import React from 'react';
import {useState} from 'react';
import '../SignUp/Sign.css';
import MyLogo from '../Image/logo123.png';
import step11 from '../Image/step11.png';
import step22 from '../Image/step22.png';
import step33 from '../Image/step33.png';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from '../Components/LoadingSpinner';
import { Link } from 'react-router-dom';
import {MdVerified} from "react-icons/md";

let resMsg;
function validatePhoneNumber(phoneNumber) {
    if (phoneNumber.length > 10) {
      return false; // Phone number is too long
    }
    return true; // Phone number is valid
  }

function MyVerticallyCenteredModal(props) {

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered  >
        
            <Modal.Body style={{padding:'68px',backgroundColor:'#D9D9D9'}}>
                <center>
                <MdVerified size={40} style={{color: 'green'}}/><br/>
                <span style={{color: '#32325D',fontSize:'30px',fontWeight:'700'}}>Your company has been<br/>successfully registered</span></center>
                <div className='main-box text-center'>
            
                    <p>
                        Please be patient and wait for the approval.
                    </p><br/>
                    <p>
                        <b>{resMsg}</b> <br/>
                    </p>
                    <Link to='/'><Button onClick={props.onHide} className='i-understand'>Okay</Button></Link>
                </div>
            </Modal.Body>
       
        </Modal>
    );
}


function Register(){
   
    const color_style ={
            color: '#525252',
    };
    
    const [accountNo, setAccountNo] = useState("");
    const [contactNum, setContact] = useState("");
    const [bankName, setBank] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [paymentDueDate, setDueDate] = useState("");
    const [estimatedWaterUsage, setWaterUsage] = useState("");
    const [noOfMeters, setNoOfMeters] = useState("");
    const [serverResponseReceived, setServerResponseReceived] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tel1Error, setTelError] = useState("");
    const [data, setData] = useState(null);
    
    const [modalShow, setModalShow] = React.useState(false);
  
   
    const handleWaterUsage = (event) => {
        setWaterUsage(event.target.value);
    };
    const handleMeters = (event) => {
        setNoOfMeters(event.target.value);
    };
    
    
    const handleBank = (event) => {
        setBank(event.target.value);
    };
    const handleAccountNo = (event) => {
        setAccountNo(event.target.value);
    };
    
    const handlePaymeDueDate = (event) => {
        setDueDate(event.target.value);
    };
    const handleContact = (event) => {
        setContact(event.target.value);
        const regex = /^[0-9]+$/; // regex pattern to match only digits
        if (!regex.test(contactNum)) {
            setTelError("Please enter numbers only");
        } else if (contactNum.length !== 10) {
            setTelError("Phone number must be 10 digits or less");
        } else {
            setTelError("");
        }
        
      };
   
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        if (!isChecked) {
            setErrorMsg('*Please agree to all terms and conditions');
        } 
     
        else {
            // handle form submission
        
            const data = {
                companyName: event.target.companyName.value,
                address: event.target.address.value,
                email1: event.target.email1.value,
                contactNum: contactNum,
                fullName: event.target.fullname.value,
                email2: event.target.email2.value,
                jobTitle: event.target.jobTitle.value,
                billingCycle : event.target.billingCycle.value,
                accountNum : accountNo,
                bankName : bankName,
                paymentDueDate : paymentDueDate,
                estimatedWaterUsage : estimatedWaterUsage,
                noOfMeters : noOfMeters,
                paymentMethod: event.target.paymentMethod.value,
            
            };
            axios.post('https://wavebilling-backend-sabinlohani.onrender.com/register-company', data)
            .then(response => {
                resMsg = response.data.message;
                setServerResponseReceived(true);
                setLoading(false);
                console.log(response)
                
            })
            .catch(error => console.log(error));
        }
      };
    return(
        <div>

      
            <div className='register_company '> 
                <div className='d-flex' style={{borderBottom:'1px solid #B9B9B9'}}>
                    <div style={{ height:'100px'}}>
                        <img src={MyLogo} alt="Kathmandu Upatyaka Khanepani Limited" className="userImage" />
                    </div>
                    <div> 
                        <h3 style={{paddingTop:'39px'}}>Register Your Account</h3>
                    </div>
                </div>
                <div className='container_wrapper'>
                    <p style={{color: '#525252',paddingLeft: '23px', paddingTop:'60px'}} >Fill the form below to create an account.</p>
                    <div className='d-flex myimagecontainer'>
                        <div>
                        <img src={step11} alt="Kathmandu Upatyaka Khanepani Limited" className="Community-image" />
                        </div>
                        <div>
                        <img src={step22} alt="Kathmandu Upatyaka Khanepani Limited" className="Community-image" />
                        </div>
                        <div>
                        <img src={step33} alt="Kathmandu Upatyaka Khanepani Limited" className="Community-image" />
                        </div>
                    </div>
                
                <div>
                    <h4 className="spacingH4">
                        <b style={color_style} > Company Details</b>
                    </h4>
                </div>
                <div className='formWrapper'>
                    <form action="/action_page.php" onSubmit={handleSubmit} className=" ">
                        <div className='MyCompanyDetails'>
                            <table className='myTable'>
                                <tbody>
                                <tr>
                                    <td>
                                        <label>Company Name:</label>
                                    </td>
                                    <td>
                                        <input type="text" name = "companyName"id="inputField" placeholder='Company Name'  required className='login-field'/><br />       
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Address:</label>
                                    </td>
                                    <td>
                                        <input type="text" name = "address"id="inputField" placeholder='Address' required className='login-field'/><br />    
                                    </td>   
                                </tr>
                                <tr>
                                    <td>
                                        <label>Email:</label>
                                    </td>
                                    <td>
                                        <input type="text" name = "email1"id="inputField" placeholder='Email Address' required className='login-field'/><br />    
                                    </td>   
                                </tr>
                                <tr>
                                    <td>
                                        <label>Primary Contact Details:</label>
                                    </td>
                                    <td>
                                        <input type="text" name = "fullname" id="inputField" placeholder='Full Name' required className='login-field'/><br /> 
                                        <input type="text" name = "email2" id="inputField" placeholder='Email Address' required  className='login-field'/><br />
                                        <input type="text" name = "jobTitle" id="inputField" placeholder='Job Title' required className='login-field'/><br />
                                        <input type="text" name = "contactNum" value={contactNum } id="inputField" placeholder='Contact Number' required className='login-field' onChange={handleContact}/><br />
                                        {tel1Error && <div className="error" style={{ color: 'red' }}>{tel1Error}</div>}
                                    </td>   
                                </tr>
                                </tbody>
                            </table>
                        </div>
                
                        <div>
                            <h4 className="spacingH4Payment">
                                <b style={color_style} > Payment Details</b>
                            </h4>
                        </div>
                        <div className='MyCompanyDetails'>
                            <table className='myTable' >
                                <tr className='myRadioButton'>
                                    <td>
                                        <label>Payment Method:</label>
                                    </td>
                                    <td>
                                        <input className="form-check-input" type="radio" name="paymentMethod" value="Esewa" id="flexRadioDefault1" />
                                        <span style={{paddindLeft:'10px',paddingRight:'10px'}}> Esewa</span>
                                    
                                        <input className="form-check-input" type="radio" name="paymentMethod" value="Khalti" id="flexRadioDefault1" />
                                        <span style={{paddindLeft:'10px',paddingRight:'10px'}}> Khalti</span>
                                    
                                        <input className="form-check-input" type="radio" name='paymentMethod' value="Bank" id="flexRadioDefault1" />
                                        <span style={{paddindLeft:'10px',paddingRight:'10px'}}> Bank Name</span>
                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <label>Bank Name:</label>
                                    </td>
                                    <td>
                                        <input type="text" id="inputField" placeholder='Bank Name' name = "bankName" value={bankName} className='login-field' required onChange={handleBank}/><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Account Number:</label>
                                    </td>
                                    <td>
                                        <input type="text" id="inputField" placeholder='Account Number'  value={accountNo} className='login-field'  required onChange={handleAccountNo}/><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Billing Cycle:</label>
                                    </td>
                                    <td>
                                        <select className='selectOption' name='billingCycle'>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Quarterly">Quarterly</option>
                                            <option value="Half Yearly">Half Yearly</option>
                                            <option value="Yearly">Yearly</option>
                                        </select>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Payment Due Date:</label>
                                    </td>
                                    <td>
                                        <input type="date" id="inputField" placeholder='Due Date' value={paymentDueDate} className='login-field' required onChange={handlePaymeDueDate} style={{color:'rgba(0, 0, 0, 0.4)'}}/><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Estimated Water Usage:</label>
                                    </td>
                                    <td>
                                        <input type="text" id="inputField" placeholder=' Water Usuage' value={estimatedWaterUsage} className='login-field' required onChange={handleWaterUsage}/><br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>No. of meters required: </label>
                                    </td>
                                    <td>
                                        <input type="text" id="inputField" placeholder='No. of meters ' value={noOfMeters} className='login-field' required onChange={handleMeters} /><br/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" required checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                            <label className="form-check-label" >
                            By submitting this form, I agree to the terms and conditions of the WaveBilling and any applicable policies, rules, or regulations.
                            </label>
                        </div>
                        {errorMsg && <p className="error" style={{color:'red'}}>{errorMsg}</p>}
                        <center>
                            <input type="submit" value="Submit" id="submitCompany"   onClick={() => setModalShow(true)}/><br/>
                            <Link to='/signinas'><button className='myCompanyButton'>Go Back</button></Link>
                        </center>
                    </form>
                        {loading && !serverResponseReceived && <LoadingSpinner />}
                        {serverResponseReceived ? (
                        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />) : null}
                    </div>
                </div>
            
            </div>
        </div>
    );
}
export default Register;