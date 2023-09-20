

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Router,Routes,Route,Navigate,Link } from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import { ToastContainer } from "react-toastify";
import UserEvents from "./Events/Events";
import Calenders from './Birthdays/Birthdays.jsx'
import Holidays from "./Holidays/Holidays";
import Profile_ProjectAllocation from "./Profile_ProjectAllocation/UserProfile_ProjectAllocation";

// import Users from "./UserProfile/Users";
// import UserEvents from "./Events";
// import Events from "./Events";
const UserDashBoard = () =>{
    const email = localStorage.getItem('email')
    const navigate = useNavigate()
    useEffect(() =>{
        const jsonToken = localStorage.getItem('jwt')
        !jsonToken && navigate("/")
    })
  
      return (
       <>
        <div className="app-container">
          {/* Sidebar/Navigation */}
          <div className="sidebar">
            <nav>
              <ul>
                <li>
                  <Link to="profile">Profile</Link>
                </li>
                <li>
                  <Link to="events">Events</Link>
                </li>
                <li>
                  <Link to="birthdays">Birthdays</Link>
                </li>
                <li>
                  <Link to="holidays">Holidays</Link>
                </li>
                <li>
                    <i className="" onClick={() => {
                       localStorage.removeItem("jwt")
                       localStorage.removeItem("id")
                       localStorage.removeItem("email")
                      navigate("/")}}>Logout</i> 
                </li>
              </ul>
            </nav>
          </div>
  
          {/* Main Content */}
          <div className="main-content">
            
            <Routes>
              <Route path="profile" element={<Profile_ProjectAllocation />} />
              <Route path="events" element={<UserEvents />} />
              <Route path="birthdays" element={<Calenders />} />
              <Route path="holidays" element={<Holidays />} />
              {/* <Route path="profile" element={<UserProfile_ProjectAllocation />} /> */}
              
            </Routes>
          </div>
        </div>
        </>
      );
      

}


export default UserDashBoard