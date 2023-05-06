import React, { useState } from 'react';
import step1 from '../Image/step1.png';
import step2 from '../Image/step2.png';
import step3 from '../Image/step3.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyLogo from '../Image/logo123.png';
import { MdVerified } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from '../Components/LoadingSpinner';

function validatePhoneNumber(phoneNumber) {
  if (phoneNumber.length > 10) {
    return false; // Phone number is too long
  }
  return true; // Phone number is valid
}
let resMsg;
function MyVerticallyCenteredModal(props) {

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered  >

      <Modal.Body style={{ padding: '68px', backgroundColor: '#D9D9D9' }}>
        <center>
          <MdVerified size={40} style={{ color: 'green' }} /><br />
          <span style={{ color: '#32325D', fontSize: '30px', fontWeight: '700' }}>Your account has been<br /> successfully registered</span></center>
        <div className='main-box text-center'>

          <p>
            Please be patient and wait for the approval.
          </p><br />
          <p>
            <b>{resMsg}</b><br />
          </p>
          <Link to='/'><Button onClick={props.onHide} className='i-understand'>Okay</Button></Link>
        </div>
      </Modal.Body>

    </Modal>
  );
}

function User() {
  const color_style = {
    color: '#525252',
  };
  const supplementary = {
    color: '#525252',
    marginTop: '30px',
    marginBottom: '10px',
  };
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [houseNo, setHouseNo] = useState("");

  const [tole, setTole] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [tel1, setTel] = useState("");
  const [tel2, setTel2] = useState("");
  const [email, setEmail] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [nationality, setNationality] = useState("");
  const [citizenshipNo, setcitizenshipNo] = useState("");
  const [citizenshipDoc, setCitizenshipDoc] = useState("");
  const [landOwnershipDoc, setLandOwnershipDoc] = useState("");
  const [tel1Error, setTelError] = useState("");
  const [tel2Error, setTel2Error] = useState("");
  const [serverResponseReceived, setServerResponseReceived] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const handleIssueDate = (event) => {
    setIssueDate(event.target.value);
  };
  console.log(issueDate);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleMiddleName = (event) => {
    setMiddleName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleHouseNo = (event) => {
    setHouseNo(event.target.value);
  };

  const handleTole = (event) => {
    setTole(event.target.value);
  };
  const handleWard = (event) => {
    setWardNo(event.target.value);
  };
  const handleTel1 = (event) => {
    const tel1Value = event.target.value;
    setTel2(event.target.value);
    const regex = /^[0-9]+$/; // regex pattern to match only digits
    if (!regex.test(tel1Value)) {
      setTelError("Please enter numbers only");
    } else if (tel1Value.length !== 10) {
      setTelError("Phone number must be 10 digits");
    } else {
      setTelError("");
    }
  };
  const [isChecked, setIsChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const handleTel2 = (event) => {
    const tel2Value = event.target.value;
    setTel2(event.target.value);
    const regex = /^[0-9]+$/; // regex pattern to match only digits
    if (!regex.test(tel2Value)) {
      setTel2Error("Please enter numbers only");
    } else if (tel2Value.length !== 10) {
      setTel2Error("Phone number must be 10 digits");
    } else {
      setTel2Error("");
    }
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleNationality = (event) => {
    setNationality(event.target.value);
  };
  const handleCitizen = (event) => {
    setcitizenshipNo(event.target.value);
  };
  const handleCitizenDoc = (event) => {
    setCitizenshipDoc(event.target.value);
  };
  const handleLandDoc = (event) => {
    setLandOwnershipDoc(event.target.value);
  };



  // const [show, setShow] = useState(false);
  // const navigate = useNavigate();
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  //  const handleLogOut = () => {
  //     alert('Your account has been successfully created!');
  //     navigate('/');
  //   };
  //   const handleEditProfile = () => {
  //     navigate('/editprofile');
  //   };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (!isChecked) {
      setErrorMsg('*Please agree to all terms and conditions');
    }
    else {
      const citizenshipDocFile = event.target.citizenshipDoc.files[0];
      const landOwnershipDocFile = event.target.landOwnershipDoc.files[0];
      const issueDateAsString = new Date(issueDate).toISOString();
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('middleName', middleName);
      formData.append('lastName', lastName);
      formData.append('houseNo', houseNo);
      formData.append('tole', tole);
      formData.append('wardNo', wardNo);
      formData.append('municipality', event.target.municipality.value);
      formData.append('province', event.target.province.value);
      formData.append('tel1', tel1);
      formData.append('tel2', tel2);
      formData.append('issueDate', issueDateAsString);
      formData.append('email', email);
      formData.append('nationality', nationality);
      formData.append('citizenshipNo', citizenshipNo);
      formData.append('citizenshipDoc', citizenshipDocFile);
      formData.append('landOwnershipDoc', landOwnershipDocFile);

      axios.post('https://wavebilling-backend-sabinlohani.onrender.com/register-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response);
          resMsg = response.data.message;
          setServerResponseReceived(true);
          console.log("successful");
          setLoading(false);

        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div>
      {/* top part */}
      <div className='d-flex' style={{ borderBottom: '1px solid #B9B9B9' }}>
        <div style={{ height: '100px' }}>
          <img src={MyLogo} alt="Kathmandu Upatyaka Khanepani Limited" className="userImage" />
        </div>
        <div>
          <h3 style={{ paddingTop: '39px' }}>Request User Account</h3>
        </div>
      </div>

      {/* down section */}

      <div className="container">
        <div className="contanier-box">
          <p style={{ color: '#525252', paddingLeft: '23px', paddingTop: '60px' }} >Fill the form below to create an account.</p>
          <br />
          <form onSubmit={handleSubmit}>
            {/* image section flex */}
            <div className='d-flex myimagecontainer'>
              <div>
                <img src={step1} alt="Kathmandu Upatyaka Khanepani Limited" className="Community-image" />
              </div>
              <div>
                <img src={step2} alt="Kathmandu Upatyaka Khanepani Limited" className="Community-image" />
              </div>
              <div>
                <img src={step3} alt="Kathmandu Upatyaka Khanepani Limited" className="Community-image" />
              </div>
            </div>


            <div className='second-section'>
              <h4>
                <b style={color_style} className="PersonalInformation">Personal Information</b>
              </h4>
              <div className='formSection'>

                <label className="align_items" >Full Name:</label><br />

                <div className="d-flex">
                  <div>
                    <input type="text" id="first-name" value={firstName} placeholder="Firstname" required onChange={handleFirstName} /><br />
                  </div>
                  <div>
                    <input type="text" id="middle-name" value={middleName} placeholder="Middlename" onChange={handleMiddleName} /><br />
                  </div>
                  <div>
                    <input type="text" id="last-name" value={lastName} placeholder="Lastname" required onChange={handleLastName} /><br />
                  </div>
                </div>

                <label>Address:</label><br />

                <div className="d-flex">
                  <div>
                    <input type="text" id="houseNo" name="houseNo" value={houseNo} placeholder="House No" required onChange={handleHouseNo} />{'\n'}
                  </div>
                  <div>
                    <input type="text" id="tol" name="tole" value={tole} placeholder="Tol " required onChange={handleTole} /><br />{'\n'}
                  </div>
                  <div>
                    <input type="number" id="ward" name="wardNo" placeholder="Ward No" value={wardNo} required onChange={handleWard} />{'\n'}
                  </div>
                </div>



                <div className="d-flex">
                  <div>
                    <select id="Municipalities" name="municipality" className="select_option" >
                      <option value="">Municiplaity</option>
                      <option value="Kathmandu">    Kathmandu Metropolitan City  </option>
                      <option value="Lalitpur">    Lalitpur Metropolitan City </option>
                      <option value="Bhaktapur">    Bhaktapur Municipality</option>
                      <option value="Pokhara">    Pokhara Metropolitan City</option>
                      <option value="Biratnagar">    Biratnagar Metropolitan City</option>
                      <option value="Dharan">    Dharan Sub-metropolitan City</option>
                      <option value="Birgunj">    Birgunj Metropolitan City</option>
                      <option value="Janakpur">    Janakpur Sub-metropolitan City</option>
                      <option value="Hetauda">    Hetauda Sub-metropolitan City</option>
                      <option value="Butwal">    Butwal Sub-metropolitan City</option>
                      <option value="Nepalgunj">    Nepalgunj Sub-metropolitan City</option>
                      <option value="Tulsipur">    Tulsipur Sub-metropolitan City</option>
                      <option value="Siddharthanagar">    Siddharthanagar Municipality</option>
                      <option value="Dhangadhi">    Dhangadhi Sub-metropolitan City</option>
                      <option value="Mahendranagar">    Mahendranagar Municipality</option>
                      <option value="Birendranagar">    Birendranagar Municipality</option>
                      <option value="Surkhet">    Surkhet Municipality</option>
                      <option value="Gulariya">    Gulariya Municipality</option>
                      <option value="Rajbiraj">   Rajbiraj Municipality</option>
                      <option value="Dhankuta">    Dhankuta Municipality</option>

                    </select>
                  </div>
                  <div>
                    <select id="province" name="addressProvince" className="select_option" >
                      <option value="" style={color_style} >Province</option>
                      <option value="Koshi Province">Koshi Province</option>
                      <option value="Madhesh Province">Madhesh Province</option>
                      <option value="Bagmati Province">Bagmati Province</option>
                      <option value="Gandaki Province">Gandaki Province</option>
                      <option value="Province 5">Lumbini Province </option>
                      <option value="Karnali Province">Karnali Province</option>
                      <option value="Sudurpashchim Province">Sudurpashchim Province</option>
                    </select>
                  </div>
                </div>

                <label >Contact No:</label><br />
                <div className="d-flex">
                  <div>
                    <input type="tel" id="telephone" name="tel1" placeholder="Telephone No" value={tel1} onChange={handleTel1} /><br />
                    {tel1Error && <div className="error" style={{ color: 'red' }}>{tel1Error}</div>}
                  </div>

                  <div>
                    <input type="tel" id="telephone2" name="tel2" placeholder="Mobile No" value={tel2} onChange={handleTel2} /><br />
                    {tel2Error && <div className="error" style={{ color: 'red' }}>{tel2Error}</div>}
                  </div>
                </div>

                <label>Email Address:</label><br />
                <input type="email" id="myemail" name="email" placeholder="Email Address" required value={email} onChange={handleEmail} /><br />

                <div className="d-flex">
                  <div>
                    <label>Nationality:</label><br />
                    <input type="text" id="nationality" name="nationality" value={nationality} placeholder="Nationality" required onChange={handleNationality} /><br />
                  </div>
                  <div>
                    <label >Citizenship No:</label><br />
                    <input type="text" id="citizenship-number" value={citizenshipNo} placeholder="Citizenship No." required onChange={handleCitizen} /><br />

                  </div>
                  <div>
                    <label>Issue Date:</label><br />
                    <input type="date" id="date-number" value={issueDate} required onChange={handleIssueDate} placeholder="Issue Date" /><br />

                  </div>

                </div>
              </div>
            </div>

            <div className='second_sectio'>
              <h4 style={supplementary}>
                <b className="PersonalInformatio">Documents</b>
              </h4>
              <div className='formSection'>
                <div className="d-flex ">
                  <div>
                    <label >Citizenship:</label><br />
                    <input type="file" id="citizenshipDoc" name="citizenshipDoc" value={citizenshipDoc} accept=".pdf,.doc,.docx" className="choosefile" required onChange={handleCitizenDoc} /><br />
                  </div>
                  <div>
                    <label >Land Ownership Certificate:</label><br />
                    <input type="file" id="land-doc" name="landOwnershipDoc" value={landOwnershipDoc} accept=".pdf,.doc,.docx" required onChange={handleLandDoc} /><br />
                  </div>
                </div>

              </div>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" required checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
              <label className="form-check-labels" >
                I hereby confirm that the information I have submitted is accurate and complete. I attest that all the details provided are true to the best of my knowledge.
              </label>
            </div>

            <div style={{ textAlign: 'center', paddingRight: '246px' }}>
              <center><input type="submit" value="Submit" id="submitUser" onClick={() => setModalShow(true)} /><br />
                <Link to='/signinas'>  <button className='myCompanyButton'> Go Back</button></Link></center>
            </div>

          </form>
          {loading && !serverResponseReceived && <LoadingSpinner />}
          {serverResponseReceived ? (
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
          ) : null}
        </div>
      </div>

    </div>

  );
}

export default User;

{/* <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create an account </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to create an account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogOut}>
            Confirm
          </Button>
      
        </Modal.Footer>
      </Modal> */}