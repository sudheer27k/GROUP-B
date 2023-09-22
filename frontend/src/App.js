import React from "react";

import SignIn from "./Component/SignIn/SignIn"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from "./Component/Admin/AdminDashboard";
import UserDashBoard from "./Component/User/UserDashboard";


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} />
      <Routes>
        <Route path="/" element={<SignIn />} /> 
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/user/*" element={<UserDashBoard />} /> 
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
