import History from '../Components/Table';
import Nav from '../NavbarFolders/Navbar';
import Sidebars from '../HomePage/Sidebar';
import '../Css/EditProfile.css';

function BillHistory() {
    return (
        <div className='containerHome'>
            {/* Navigation sidebar */}
            <div className='left-left-nav'>
                <Sidebars />
            </div>

            <div className='right-right-nav-Home'>
                <div className=''>
                    <Nav />
                </div>

                <div className='' id='bill-history-section'>
                    <p style={ { fontSize: '22px', fontWeight: 'bold',marginLeft:'210px' } } >Payment</p>
                    <div className='' style={{marginLeft:'240px'}}>
                        <History />
                    </div>

                </div>

            </div>

        </div>
    );
}
export default BillHistory;