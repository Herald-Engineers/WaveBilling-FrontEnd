import React , { useState,useEffect }from 'react';
import { saveAs } from 'file-saver';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import {PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function HistorySection() {
  const location = useLocation();
  const id = location.state.id;
  console.log("View History of Id: ", id);
    const token = localStorage.getItem('token');
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        axios.get("https://wavebilling-backend-sabinlohani.onrender.com/my-receipts", {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
              _id: id
          }
        })
        .then((response) => {console.log(response.data);setTableData(response.data)})
        .catch((error) => console.log(error.response.data));
      }, []);
      return (
        <div className='text-center '>
          <div className='bill'>
          <h2 style={{color:'#2F4858',margin:'20px'}}>Pay for your bill</h2>
          <div>
            <center>
                <p>Payment Successful</p>
                <p>Your bill has been successfully paid</p>
            </center>
          </div>
          <div className='historyTable'>
  
          
          <table className='' style={{fontSize:'20px'}}>
          {tableData.map((row) => (
            <React.Fragment key={row.id}>
              <tr>
                <th>Receipt date:</th>
                <td>{new Date(row.paymentDate).toLocaleDateString()}</td>
              </tr>
              
              <tr>
                <th>Customer Id:</th>
                <td>{row.consumerId}</td>
              </tr>
              <tr>
                 <th>Customer Name: </th>
                <td>{row.consumerName}</td>
              </tr>
                    <tr>
                      <th>Customer Address:</th> <td>{row.consumerAddress}</td></tr>
                    
                    <tr>
                      <th>Bill Amount:</th><td> {row.billAmount}</td></tr>
                    <tr>
                      <th>Meter No: </th><td>{row.meterNo}</td></tr>
                    
                    <tr>
                      <th>Payment Mode:</th><td> {row.paymentMode}</td></tr>
                    <tr>
                      <th>Previous Advance Amount: </th><td>{row.previousAdvanceAmount}</td></tr>
                    
                    <tr>
                      <th>Total Amount Paid: </th><td>{row.totalAmount}</td></tr>
            </React.Fragment>
             ))}
          </table>
          </div>
          </div>
        </div>
      );
    }
function PaymentSuccess(){
  const location = useLocation();
  const id = location.state.id;
  console.log("Payment Success Page of Id: ", id);
  const token = localStorage.getItem('token');
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
      axios.get("https://wavebilling-backend-sabinlohani.onrender.com/my-receipts", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
            _id: id
        }
      })
      .then((response) => {console.log("Payment Success Data:",response.data);setTableData(response.data)})
      .catch((error) => console.log(error.response.data));
    }, []);
    const MyDoc = () => (
        console.log('MyDoc component rendered'),
        <Document>
          <Page>
            <View style={{ marginBottom: 8, padding:'30px'}}>
              <Text style={{marginBottom:'20px',fontSize:'19px',fontWeight:'800',textAlign:'center'}}>Payment Successful </Text>
              <Text style={{marginBottom:'20px',fontSize:'16px',fontWeight:'600',textAlign:'center'}}>Your bill has been successgully paid</Text>
             
              {tableData.map((row) => (
                <React.Fragment key={row.id} className="downloadHistory">
                 <b> <Text style={{marginBottom:'20px',fontSize:'13px',fontWeight:'800'}}><Text style={{marginBottom:'20px',fontSize:'13px',fontWeight:'1000',color:'#2F4858',marginRight:'5px'}} >Payment Date: </Text>{new Date(row.paymentDate).toLocaleDateString()}</Text></b>
                  <Text style={{marginBottom:'10px',fontSize:'13px',fontWeight:'bolder'}}><Text style={{marginBottom:'20px',fontSize:'13px',fontWeight:'bolder',color:'#2F4858',marginRight:5}} >Customer Id: </Text>{row.consumerId}</Text>
                  <Text style={{marginBottom:'10px',fontSize:'13px',fontWeight:'bolder'}}><Text style={{marginBottom:'20px',fontSize:'13px',fontWeight:'bolder',color:'#2F4858',marginRight:5}} >Customer Name:  </Text>{row.consumerName}</Text>
                  <Text style={{marginBottom:'10px',fontSize:'13px',fontWeight:'bolder'}}><Text style={{marginBottom:'20px',fontSize:'13px',fontWeight:'bolder',color:'#2F4858',marginRight:5}} >Customer Address:  </Text>{row.consumerAddress}</Text>
                  <Text style={{marginBottom:'10px',fontSize:'13px',fontWeight:'bolder'}}><Text style={{marginBottom:'20px',fontSize:'13px',fontWeight:'bolder',color:'#2F4858',marginRight:5}} >Meter No: </Text>{row.meterNo}</Text>
                  <Text style={{marginBottom:'10px',fontSize:'13px',fontWeight:'bolder'}}><Text style={{marginBottom:'20px',fontSize:'13px',fontWeight:'bolder',color:'#2F4858',marginRight:5}} >Bill Amount: </Text>{row.billAmount}</Text>
                  <Text style={{marginBottom:'10px',fontSize:'13px',fontWeight:'bolder'}}><Text style={{marginBottom:'20px',fontSize:'13px',fontWeight:'bolder',color:'#2F4858',marginRight:5}} >Payment Mode: </Text>{row.paymentMode}</Text>
                  <Text style={{marginBottom:'10px',fontSize:'13px',fontWeight:'bolder'}}><Text style={{marginBottom:'20px',fontSize:'13px',fontWeight:'bolder',color:'#2F4858',marginRight:5}} >Previous Advance Amount: </Text>{row.previousAdvanceAmount}</Text>
                  <Text style={{marginBottom:'10px',fontSize:'13px',fontWeight:'bolder'}}><Text style={{marginBottom:'20px',fontSize:'13px',fontWeight:'bolder',color:'#2F4858',marginRight:5}} >Total to be paid: </Text>{row.totalAmount}</Text>
                </React.Fragment>
              ))}
            </View>
          </Page>
        </Document>
      );
    return(
        <div className='containerHome'>
      <div className='left-left-nav'>
        <Sidebars />
      </div>
      <div className='right-right-nav-Home'>
        <div className=''>
          <Nav />
        </div>
        <HistorySection />
          
        <div className='historyTable2'>
          <div id=''>
            <PDFDownloadLink document={<MyDoc />} fileName="Payment.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : <button  className='btn btn-primary'>Download</button>
              }
            </PDFDownloadLink>
          </div>
          
          
        </div> 
       
      </div>
    </div>
    );
}
export default PaymentSuccess;