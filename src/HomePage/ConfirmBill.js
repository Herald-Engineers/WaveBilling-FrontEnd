import React, { useState, useEffect } from 'react';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function ConfirmPay() {
    const navigate = useNavigate();
    function handleNextClick() {
        // Render the ViewDetails component
        navigate("/paymentSuccess");
    };
    const location = useLocation();
    const id = location.state.id;
    const paymentMethod = location.state.paymentMethod;
    console.log("Confirm Pay Id: ", id);
    const token = localStorage.getItem('token');
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [advancePayment, setAdvancePayment] = useState('');

    function handleAdvance(event) {
        setAdvancePayment(event.target.value);
    }
    useEffect(() => {
        axios.get("https://wavebilling-backend-sabinlohani.onrender.com/fetch-receipt-details", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                receiptId: id
            }
        })
            .then((response) => { console.log(response.data); setTableData(response.data); setIsLoading(false) })
            .catch((error) => console.log(error.response.data));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send a POST request to the server with the entered username and password
        axios.post("https://wavebilling-backend-sabinlohani.onrender.com/pay-bill", {
            paymentMode: paymentMethod,
            billId: id,
            advancePayment: advancePayment
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {

                navigate("/paymentSuccess", { state: { id } });
                // Depending on the user role, navigate to a different page
                console.log(res.data);

            })
            .catch(error => {
                alert("Payment failed!");
                console.log(error.response.data);

            });
    };

    return (
        <div className='containerHome'>
            <div className='left-left-nav'>
                <Sidebars />
            </div>
            <div className='right-right-nav-Home'>
                <div className=''>
                    <Nav />
                </div>

                <div className='' id='payNowPage'>
                    <center><h2 style={{ color: '#2F4858', marginTop: '30px' }}>Pay for your bill</h2></center>
                    <div className='Pay-section'>
                        <div className='ConfirmBill'>
                            <center>
                                <h4>Confirm Payment?</h4>
                                <p>Are you sure want to confirm and pay for the bill?</p>
                                {isLoading?<p>Loading...</p>:
                                    <form onSubmit={handleSubmit}>

                                        <table>
                                            <tr>
                                                <td>Amount:</td>
                                            </tr>
                                            <tr>
                                                <input value={tableData.totalAmount} style={{ width: '220.800px', height: '24px', padding: '20px 20px', margin: '8px 20px 8px 0px', borderRadius: '4px' }} disabled/>
                                            </tr>
                                            <tr>
                                                <td>Advance Payment (Optional): </td>
                                            </tr>
                                            <tr>
                                                <td><input type='number' defaultValue={0} name='advancePayment' onChange={handleAdvance} /></td>
                                            </tr>
                                        </table>
                                        <div className='buttonAlign'>
                                            <Link to="/payNow"><button className='btn btn-secondary'>Back</button></Link>
                                            <button className='btn btn-primary nextButton' type='submit'  >Pay</button>
                                        </div>
                                    </form>
                                }
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ConfirmPay;