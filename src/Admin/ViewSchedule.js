import { useState } from 'react';
import { useEffect } from "react";
import axios from 'axios';



function ViewSChedule(){
    const token = localStorage.getItem('token');
    const [tableData, setTableData] = useState([]);
    const [reader, setReader] = useState(null);
    useEffect(() => {
        axios.get("https://wavebilling-backend-sabinlohani.onrender.com/admin/fetch-schedules", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        setTableData(response.data);
      })
      .catch((error) => console.log(error));
      }, [reader]);
    return(
        <div>
            
            <div className='justify-content center right-width myTables2'style={{ width: '1078px', height:'447px',marginBottom: '40px'}}>
                <div className='d-flex justify-content-center headingBorder' style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                                
                                <div>
                                    <h4 className='text-center'style={{color:'#2F4858',height:'37px',fontWeight:'600'}}>View Schedule</h4>
                                </div>
                </div>

                <div style={{ width: '989px', marginTop:'10px' , marginLeft: '40px',marginRight: '40px', height:'320px', overflowX: 'scroll'}}>
                    <table className='table table-striped meterReader-table outer-border' style={{width:'1500px',height:'325px',overflowX:'scroll'}}>
                        <thead>
                            <tr>
                                <th style={{ width: '500px' }}>Name</th>
                                <th style={{ width: '500px' }}>Address-1</th>
                                <th style={{ width: '500px' }}>Address-2</th>
                                <th style={{ width: '500px' }}>Address-3</th>
                                <th style={{ width: '500px' }}>Address-4</th>
                                <th style={{ width: '500px' }}>Address-5</th>
                                <th style={{ width: '500px' }}>Date</th>
                                <th style={{ width: '500px' }}>Shift</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row._id}>
                                    <td>{row.assignedTo}</td>
                                    <td>{row.address1}</td>
                                    <td>{row.address2}</td>
                                    <td>{row.address3}</td>
                                    <td>{row.address4}</td>
                                    <td>{row.address5}</td>
                                    <td>{row.date}</td>
                                    <td>{row.shift}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ViewSChedule;