import React, { useState } from 'react';
import '../Admin/MeterReader.css';
import {BiAddToQueue} from "react-icons/bi";
import MeterSidebar from '../MeterReaderPage/MeterSidebar';
import MainBox from '../Admin/MainBoxes';
import MeterTable from '../Admin/MeterTable';
function MeterDashboard(){
    return(
        <div>
            <div className='containerHome'>
                <div className='left-left-nav'>
                    <MeterSidebar/>
                </div>
            
            
                <div className='right-right-nav-Home2'>
                    <div>
                        <MainBox />
                    </div>
                    <div className="d-flex">
                        <BiAddToQueue size={27}  />
                        <div style={{display:'block'}}>
                            <u> <p >Add new reader</p></u>
                        </div>
                    </div>   
                   
                     <div className='myTables'>
                        <MeterTable />
                     </div>
                    
                    
                </div>
            </div>
            

        </div>
    );
}
export default MeterDashboard;