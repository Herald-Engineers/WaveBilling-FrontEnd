import MyAdmin from '../Admin/AdminSidebar';
import  '../HomePage/Homepage.css';
import  '../Admin/AdminDash.css';
import  '../Components/SmallLogo.css';
import Main from '../Admin/MainBoxes';

function AdminDashboard() {
    if(!localStorage.token) {
        console.log('No token is: ' + !localStorage.token);
        // return (
        //     <div>
        //         Unauthorized user
        //     </div>
        // );
    }
    return (
        <div>
            <div className='containerHome2'>
                <div className='left-left-nav'>
                    <MyAdmin/>
                </div>
           
                <div className='right-right-nav-Home2'>
                    <div>
                        <Main/>
                    </div>
                
                </div> 
            </div>
        </div>
    )
}
export default AdminDashboard;