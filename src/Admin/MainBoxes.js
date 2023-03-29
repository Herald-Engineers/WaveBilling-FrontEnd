import  '../Admin/MainBox.css';
import Image1 from '../Image/total1.png';
import Image2 from '../Image/total2.png';
import Image3 from '../Image/total3.png';
import Metereader from '../Admin/MeterReader';
import { Link } from 'react-router-dom';
function MainBox(){
    return(
        <div>
            
            <div className='d-flex'>
                <Link to='/myadmin'>
                        <div className='firstbox' onClick={<Metereader/>}>
                            <div className=''>
                                <div style={{float:'left'}}>
                                    <img src={Image1} alt="logout" className="" />
                                </div>
                                <div style={{float:'right',marginTop: '0px',paddingRight: '110px'}}>
                                    <span style={{fontSize:'18px',fontWeight:'700',marginTop:'10px'}}>Total Users</span><br/>
                                    <span style={{fontSize:'14px',fontWeight:'500',color:'black'}}>4</span>
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
                                            <span style={{fontSize:'14px',fontWeight:'500',color:'black'}}>0</span>
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
                                            <span style={{fontSize:'18px',fontWeight:'700',marginTop:'10px'}}>Total Readers</span><br/>
                                            <span style={{fontSize:'14px',fontWeight:'500',color:'black'}}>3</span>
                                    </div>
                                    
                                                                    
                            </div>
                        </div>
                    </div>
        </div>
    );
}
export default MainBox;
