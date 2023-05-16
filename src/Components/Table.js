
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/Table.css';
import '../Admin/MeterReader.css';
import ReactDOMServer from 'react-dom/server';
import '../Admin/AdminDash.css';
import { saveAs } from 'file-saver';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { PDFDownloadLink, Document, Page, View, Text } from '@react-pdf/renderer';
import ViewDetails from '../HomePage/ViewDetails';


import { useNavigate } from 'react-router-dom';




function  Table() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const [tableData, setTableData] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [editId, setEditId] = useState(null);
  const[edit,setMyEditId] = useState(null);
  console.log("Receipt is: ",edit);
  // console.log("Edit id: ", editId);
  useEffect(() => {
    axios.get("https://wavebilling-backend-sabinlohani.onrender.com/my-receipts", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Receipt response data: ' + response.data);
        setTableData(response.data) 
    })
      .catch((error) => console.log(error.response.data));
  }, [edit]);

  useEffect(() => {
    axios.get("https://wavebilling-backend-sabinlohani.onrender.com/my-bills", {
      headers: {
        Authorization: `Bearer ${token}`

      }
    })
      .then((response) => { console.log('Bill response data: ' + response); setTableData2(response.data);console.log("Due by is: ",response.data.dueBy); })
      .catch((error) => console.log(error.response.data));
  }, [editId]);
  function handleViewClick(id) {
    setEditId(id);
    // Render the ViewDetails component
    console.log("My Pay bill Id is: ",id);
    navigate("/viewDetails", { state: { id } });
  };
  function handleViewClick2(id) {
    setMyEditId(id);
    // Render the ViewDetails component
    console.log("My Pay bill history Id is: ",id);
    navigate("/paymentSuccess", { state: { id } });
  };

  return (
    <div className="justify-content-center ">

      <div style={{ height: '500px', width: '1036px', overflowX: 'scroll', overflowY: 'scroll' }} className='HistoryTableCss'>
        <center><h1 style={{ color: '#2F4858', fontSize: '28px' }}>Bills</h1></center>
        <table className="table table-striped meterReader-table outer-border">
          <thead>
            <tr>
              <th style={{ width: '300px' }}>Receipt Date:</th>
              <th style={{ width: '300px' }}>Due Date:</th>
              <th style={{ width: '300px' }}>Total Amount</th>
              <th style={{ width: '300px' }}>Action</th>

            </tr>
          </thead>
          <tbody>
            {/* map the data to match the table rows */}
            {
              tableData2.map((row) => (
                <tr key={row._id}>
                  <td>{new Date(row.billDate).toLocaleDateString()}</td>
                  <td>{row.dueBy.slice(0, 10)}</td>
                  <td>Rs. {row.totalAmount}</td>
                  

                  {/* <td>{row.paid ? (row.paid === true ? <span style={{color:'green'}}>'Paid'</span> : 'Overdue') : <span style={{color:'red'}}>Pending</span>}</td> */}
                  <td><button onClick={() => {
                      
                    handleViewClick(row._id);
                    localStorage.setItem('dueBy', row.dueBy.slice(0, 10));
                  }}>View</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div style={{ height: '500px', width: '1036px', overflowX: 'scroll', overflowY: 'scroll' }} className='HistoryTableCss'>
        <center><h1 style={{ color: '#2F4858', fontSize: '28px' }}>Payment History</h1></center>
        <table className="table table-striped meterReader-table outer-border">
          <thead>
            <tr>
              <th style={{ width: '300px' }}>Payment Date</th>
              <th style={{ width: '300px' }}>Payment Mode</th>
              <th style={{ width: '300px' }}>Amount</th>
              <th style={{ width: '300px' }}>Action</th>

            </tr>
          </thead>
          <tbody>

          {tableData.map((row) => (
              <tr key={row._id}>


                <td>{new Date(row.paymentDate).toLocaleDateString()}</td>
                <td>{row.paymentMode}</td>
                <td>{row.totalAmount}</td>

                {/* <td>{row.paid ? (row.paid === true ? <span style={{color:'green'}}>'Paid'</span> : 'Overdue') : <span style={{color:'red'}}>Pending</span>}</td>  */}
                <td><button onClick={() => {

                  { handleViewClick2(row._id);}
                }}>View</button></td>
              </tr>
            ))} 
           
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
export default Table;


           