import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function HistorySection(props) {
  const location = useLocation();
  const { id } = location.state;
  const token = localStorage.getItem('token');
  const [tableData, setTableData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get("https://wavebilling-backend-sabinlohani.onrender.com/fetch-bill-details", {
      headers: {
        Authorization: `Bearer ${token}`,

      },
      params: {
        _id: id
      }
    })
      .then((response) => { console.log(response.data); setTableData(response.data); setIsLoading(false) })
      .catch((error) => console.log(error.response.data));
  }, [id, token]);
  console.log(tableData);
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='text-center'>
          <div className='bill'>
            <h2 style={{ color: '#2F4858', margin: '20px' }}>My Bill History</h2>
            <div className='historyTable'>
              <table className='' style={{ fontSize: '20px' }}>
                <tr>
                  <th>Receipt date: </th>
                  <td>{tableData.billDate.slice(0, 10)}</td>
                </tr>
                <tr style={{ marginBottom: '30px' }}>
                  <th>Due Date: </th>
                  <td >{tableData.dueBy.slice(0, 10)}</td>
                </tr>
                <tr>
                  <th>Customer Id: </th>
                  <td>{tableData.userId}</td>
                </tr>
                <tr>
                  <th>Customer Name: </th>
                  <td>{tableData.consumerName}</td>
                </tr>
                <tr>
                  <th>Customer Address: </th> <td>{tableData.consumerAddress}</td></tr>

                <tr>
                  <th>Units consumed: </th><td>Rs. {tableData.unitConsumed}</td></tr>
                <tr>
                  <th>Bill Amount: </th><td>Rs. {tableData.billAmount}</td></tr>
                <tr>
                  <th>Fine percent: </th><td>{tableData.finePercent}%</td></tr>
                <tr>
                  <th>Rebate percent: </th><td>{tableData.rebatePercent}%</td> </tr>
                <tr>
                  <th>Fine amount: </th><td>Rs. {tableData.fineAmount}</td></tr>
                <tr>
                  <th>Rebate amount: </th><td>Rs. {tableData.rebateAmount}</td></tr>

                <tr>
                  <th>Total to be paid: </th><td><strong>Rs. {tableData.totalAmount}</strong></td></tr>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




function ViewDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  console.log("View details: ", id);
  const token = localStorage.getItem('token');
  const [tableData, setTableData] = useState([]);
  const[edit,setMyEditId] = useState(null);
  function handleViewClick(id) {
  
 
    console.log("Handle View Click: ",id);
    // Render the ViewDetails component
    navigate("/payNow", { state: { id } });
  }
  useEffect(() => {
    axios.get("https://wavebilling-backend-sabinlohani.onrender.com/fetch-bill-details", {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        _id: id
      }
    })
      .then((response) => { setTableData(response.data) })
      .catch((error) => console.log(error.response.data));
  }, [id, token]);

  const myStyle = () => {
    return {
      fontSize: '13px',
      fontWeight: '600',
      marginBottom: '20px'
    }
  }
  
  const MyDoc = () => (
    <Document>
      <Page>
        <View style={{ marginBottom: 8, padding: '30px' }}>
          <Text style={{ marginBottom: '20px', fontSize: '19px', fontWeight: '800', textAlign: 'center' }}>My Bill </Text>
          <React.Fragment key={tableData._id} className="downloadHistory">
              <b> <Text style={{ marginBottom: '10px', fontSize: '13px', fontWeight: '800' }}><Text style={{ marginBottom: '20px', fontSize: '13px', fontWeight: '1000', color: '#2F4858', marginRight: '5px' }} >Receipt date: </Text>{new Date(tableData.billDate).toLocaleDateString()}</Text></b>
              <Text style={{ marginBottom: '30px', fontSize: '13px', fontWeight: 'bolder' }}><Text style={{ marginBottom: '20px', fontSize: '13px', fontWeight: 'bolder', color: '#2F4858', marginRight: 5 }} >Due Date: </Text>{new Date(tableData.dueBy).toLocaleDateString()}</Text>
              <Text style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 'bolder' }}><Text style={{ marginBottom: '20px', fontSize: '13px', fontWeight: 'bolder', color: '#2F4858', marginRight: 5 }} >Customer Id: </Text>{tableData.userId}</Text>
              <Text style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 'bolder' }}><Text style={{ marginBottom: '20px', fontSize: '13px', fontWeight: 'bolder', color: '#2F4858', marginRight: 5 }} >Customer Name:  </Text>{tableData.consumerName}</Text>
              <Text style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 'bolder' }}><Text style={{ marginBottom: '20px', fontSize: '13px', fontWeight: 'bolder', color: '#2F4858', marginRight: 5 }} >Customer Address:  </Text>{tableData.consumerAddress}</Text>
              <Text style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 'bolder' }}><Text style={{ marginBottom: '20px', fontSize: '13px', fontWeight: 'bolder', color: '#2F4858', marginRight: 5 }} >Bill Amount: </Text>{tableData.billAmount}</Text>
              <Text style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 'bolder' }}><Text style={{ marginBottom: '20px', fontSize: '13px', fontWeight: 'bolder', color: '#2F4858', marginRight: 5 }} >Fine percent: </Text>{tableData.finePercent}</Text>
              <Text style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 'bolder' }}><Text style={{ marginBottom: '20px', fontSize: '13px', fontWeight: 'bolder', color: '#2F4858', marginRight: 5 }} >Rebate percent: </Text>{tableData.rebateAmount} </Text>
              <Text style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 'bolder' }}><Text style={{ marginBottom: '20px', fontSize: '13px', fontWeight: 'bolder', color: '#2F4858', marginRight: 5 }} >Fine amount: </Text>{tableData.fineAmount}</Text>
              <Text style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 'bolder' }}><Text style={{ marginBottom: '20px', fontSize: '13px', fontWeight: 'bolder', color: '#2F4858', marginRight: 5 }} >Rebate amount: </Text>{tableData.rebateAmount}</Text>
              <Text style={{ marginBottom: '10px', fontSize: '13px', fontWeight: 'bolder' }}><Text style={{ marginBottom: '20px', fontSize: '13px', fontWeight: 'bolder', color: '#2F4858', marginRight: 5 }} >Total to be paid: </Text>{tableData.totalAmount}</Text>
            </React.Fragment>
        </View>
      </Page>
    </Document>
  );
  


  return (
    <div className='containerHome'>
      <div className='left-left-nav'>
        <Sidebars />
      </div>
      <div className='right-right-nav-Home'>
        <div className=''>
          <Nav />
        </div>
        <HistorySection id={id} />

        <div className='historyTable2'>
          <div id=''>
            <PDFDownloadLink document={<MyDoc />} fileName="historyBills.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : <button className='btn btn-primary' style={{ margin: '10px' }}>Download</button>
              }
            </PDFDownloadLink>
          </div>
          <div>


            <button className='btn btn-primary' style={{ margin: '10px' }} onClick={() => handleViewClick(id)}>Pay Now</button>

          </div>

        </div>

      </div>
    </div>


  );
}


export default ViewDetails;
