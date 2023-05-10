//import necessary files and folders
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Components/form.css';
import NextPage from './NextPage';
import Login from './Login';
import Otp from './Otp';
import CreateAccount from './CreateAcc';
import Mybills from './MyBills';
import ConversationTip from './Conversation';
import Myaccount from './MyAccount';
import HomeLayout from './HomePage/HomeLayout';
import  './Components/SmallLogo.css';
import Landingpage from './LandingPage';
import SignIn from './SignUp/SignInAs';
import MeterReader from './Admin/MeterReader';
import User from './SignUp/User';
import Graph from './HomePage/Chart';
import PopUpBox from './Components/PopUpMenu';
import MyAdmin from'./Admin/AdminSidebar';
import AdminDashboard from'./Admin/AdminDash';
import Register  from './SignUp/Register';
import EditProfile from './HomePage/EditProfile';
import Sidebar from './HomePage/Sidebar';
import ViewDetails from './HomePage/ViewDetails';
import ContactUs from './Components/ContactUs';
import ContactUsHome from './HomePage/ContactHome';
import Report from './HomePage/Report';
import BillHistory from './HomePage/BillHIstory';
import Payment from './HomePage/PaymentHistory';
import TableHistory from './Components/Table';
import Kukl from './HomePage/KUKLPay';
import PayNow from './HomePage/PayNow';
import ConfirmPayment from './HomePage/ConfirmBill';
import UserTable from './Admin/UserTable';
import Issue from './Admin/Issue';
import Schedule from './Admin/Schedule';
import ViewSchedule from './Admin/ViewSchedule';
import IssueUser from './HomePage/UserIssue';
import AdminProfile from './Admin/AdminProfile';
import MeterDash from './MeterReaderPage/MeterDash';
import MeterReaderSidebar from './MeterReaderPage/MeterSidebar';
import DataEntry from './MeterReaderPage/DataEntry';
import ScheduleMeterReader from './MeterReaderPage/ScheduleMeterReader';
import MeterIssue from './MeterReaderPage/MeterIssue';
import MeterProfile from './MeterReaderPage/MeterProfile';
import PaymentSuccess from './HomePage/PaymentSuccess';
import ViewPaid from './HomePage/VIewPaymentSuccess';
import ProfileIndividual from './HomePage/ProfileIndividual';
function App() {

  return (

    // allowing users to navigate between different pages or components within the app.
    <BrowserRouter>
        
      <Routes>
      
        <Route path="/nextpage" element={<NextPage />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/createAcc" element={<CreateAccount />} />
        <Route path="/homela" element={<HomeLayout />} />
        <Route path="/mybills" element={<Mybills />} />
        <Route path="/conversation" element={<ConversationTip />} />
        <Route path="/myaccount" element={<Myaccount />} />
        <Route path="/signinas" element={<SignIn />} />
        <Route path="/user" element={<User />} />
        <Route path="/register" element={<Register />} />
        <Route path="/viewDetails" element={<ViewDetails />} />
        <Route path="/meterReader" element={<MeterReader />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landingpage />} />
        <Route path="/chart" element={<Graph />} />
        <Route path="/popUp" element={<PopUpBox />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/contactushome" element={<ContactUsHome />} />
        <Route path="/report" element={<Report />} />
        <Route path="/billHistory" element={<BillHistory />} />
        <Route path="/paymentHistory" element={<Payment />} />
        <Route path="/table" element={<TableHistory />} />
        <Route path="/kukl" element={<Kukl />} />
        <Route path="/myadmin" element={<AdminDashboard />} />
        <Route path="/myadminsidebar" element={<MyAdmin />} />
        <Route path="/userTable" element={<UserTable />} />
        <Route path="/issue" element={<Issue />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/viewschedule" element={<ViewSchedule />} />
        <Route path="/issueUser" element={<IssueUser />} />
        <Route path="/adminProfile" element={<AdminProfile />} />
        <Route path="/dashboardMeterReader" element={<MeterDash />} />
        <Route path="/meterSidebar" element={<MeterReaderSidebar />} />
        <Route path="/dataEntry" element={<DataEntry />} />
        <Route path="/schdeuleMeterReader" element={<ScheduleMeterReader />} />
        <Route path="/meterIssue" element={<MeterIssue />} />
        <Route path="/meterProfile" element={<MeterProfile />} />
        <Route path="/payNow" element={<PayNow />} />
        <Route path="/confirmPayment" element={<ConfirmPayment />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/profileIndividual" element={<ProfileIndividual />} />
        <Route path="/viewPaid" element={<ViewPaid />} />
        
      </Routes>
    </BrowserRouter>
  );

}

export default App;