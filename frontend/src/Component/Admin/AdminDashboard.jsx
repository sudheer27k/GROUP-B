import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Router,Routes,Route,Navigate,Link } from 'react-router-dom';
import "../../Style/Admin/AdminDashboard.css"
import 'font-awesome/css/font-awesome.min.css';
import Events from "./Events";



import ProjectAllocation from "./ProjectAllocation ";
import Users from "./Users";
import { ToastContainer } from "react-toastify";
// import Events from "./Events";
const AdminDashboard = () =>{
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
                  <Link to="events">Events</Link>
                </li>
                <li>
                  <Link to="users">Users</Link>
                </li>
  
                <li>
                  <Link to="project-allocation">Project Allocation</Link>
                </li>
                <li>
                
                    <i className="fa fa-sign-out" onClick={() => {
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
              <Route path="events" element={<Events />} />
              <Route path="users" element= {<Users />} />
              <Route path="project-allocation" element= {<ProjectAllocation />} />
            </Routes>
          </div>
        </div>
      
        </>
      );
      

}


export default AdminDashboard