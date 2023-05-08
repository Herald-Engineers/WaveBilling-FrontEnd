import  '../Admin/MainBox.css';
import Image1 from '../Image/total1.png';
import Image2 from '../Image/total2.png';
import Image3 from '../Image/total3.png';
import Metereader from '../Admin/MeterReader';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from "react";

function MainBox(){
    const token = localStorage.getItem('token');
    const [tableData, setTableData] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [reader, setReader] = useState(null);
    const [consumer, setConsumers] = useState(null);
    useEffect(() => {
        axios.get("https://wavebilling-backend-sabinlohani.onrender.com/admin/fetch-readers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => setTableData(response.data.length))
      .catch((error) => console.log(error));
      }, [reader]);
      useEffect(() => {
        axios.get("https://wavebilling-backend-sabinlohani.onrender.com/admin/fetch-consumers", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => setTableData2(response.data.length))
      .catch((error) => console.log(error));
      }, [consumer]);
    return(
       
        <div>
            
            <div className='d-flex'>
                <Link to='/userTable'>
                        <div className='firstbox' >
                            <div className=''>
                                <div style={{float:'left'}}>
                                    <img src={Image1} alt="logout" className="" />
                                </div>
                                <div style={{float:'right',marginTop: '0px',paddingRight: '110px'}}>
                                    <span style={{fontSize:'18px',fontWeight:'700',marginTop:'10px'}}>Total Users</span><br/>
                                    <span style={{fontSize:'14px',fontWeight:'500',color:'black'}}>{tableData2}</span>
                                </div>
                                
                                                                
                            </div>
                                
                        </div>
                </Link>
                        <div className='firstbox'>
                            
                            <Link to='/meterReader'>
                            
                                <div className=''>
                                    <div style={{float:'left'}}>
                                        <img src={Image2} alt="logout" className="" style={{paddingTop: '7px'}} />
                                    </div>
                                    <div style={{float:'right',marginTop: '0px',paddingRight: '32px'}}>
                                            <span style={{fontSize:'18px',fontWeight:'700',marginTop:'10px'}}>Total Meter Readers</span><br/>
                                            <span style={{fontSize:'14px',fontWeight:'500',color:'black'}}>{tableData}</span>
                                    </div>
                                        
                                                                        
                                </div>
                            </Link>
                        </div>
                        <div className='firstbox'>
                            <div className=''>
                                    <div style={{float:'left'}}>
                                            <img src={Image3} alt="logout" className="" style={{paddingTop: '7px'}}/>
                                    </div>
                                    <div style={{float:'right',marginTop: '2px',paddingRight: '93px'}}>
                                            <span style={{fontSize:'18px',fontWeight:'700',marginTop:'10px'}}>Total Online</span><br/>
                                            <span style={{fontSize:'14px',fontWeight:'500',color:'black'}}>3</span>
                                    </div>
                                    
                                                                    
                            </div>
                        </div>
                    </div>
        </div>
    );
}
export default MainBox;

