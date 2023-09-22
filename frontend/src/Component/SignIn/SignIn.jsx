import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Style/SignIn/SignIn.css";
import Image from "../../Images/logo.png";
import SingInApi from "../../Service/SignIn/SingInApi";

const signInApi = new SingInApi();

const SignIn = () => {
    var navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const Info = {
        email: email,
        password: password,
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@jmangroup\.com$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleBlurEmail = () => {
        if (email && !validateEmail(email)) {
            toast.error("Email should be of the format user@jmangroup.com",{
                autoClose:1000
              });
        }
    };

    const handleBlurPassword = () => {
        if (password && !validatePassword(password)) {
            toast.error("Password should contain at least 8 characters with at least one uppercase letter, one lowercase letter, one numeric value, and one special character.",{
                autoClose:1000
              });
        }
    };


    const handleSignIn = async () => {
        if (email && password) {
            const emailIsValid = validateEmail(email);
            const passwordIsValid = validatePassword(password);

            if (emailIsValid && passwordIsValid) {
                try {
                    const response = await signInApi.SingIn(Info)
                    console.log(response)
                    localStorage.setItem('jwt', response.data.jsonToken)
                    localStorage.setItem("role", response.data.role)
                    if (response.data.message === 'details not found') {
                        toast.error("User not found",{
                            autoClose:1000
                          })
                    }
                    if (response.data.role === 'admin') {
                        toast.success("Login successfull",{
                            autoClose:1000
                          })
                        navigate('/admin/events')
                    }
                    else if (response.data.message === "admin authentication failed") {
                        toast.error("Invalid credentials",{
                            autoClose:1000
                          })
                    }
                    else if (response.data.role === 'user') {
                        navigate('/user/profile')
                        toast.success("Login successful",{
                            autoClose:1000
                          })
                    }
                    else if (response.data.message === "user authentication failed") {
                        toast.error("Invalid credentials",{
                            autoClose:1000
                          })
                    }
                    
                    localStorage.setItem("id", response.data.user.id)

                } catch (error) {
                    console.error("Error signing in:", error);
                }

            }
        }
        else {
            toast.error("All fields are required!",{
                autoClose:1000
              });
        }
    };

    return (
        <>
            <div className="signInContainer">
                <div className="signin_head">
                    <img src={Image} className="logo" alt="Logo" />
                    <h2 className="signin_h2">Jin</h2>
                </div>

                <form className="signInForm">

                    <div className="email">
                        <label className="lable">Email*</label>
                        <input className="input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleBlurEmail} // Validate on blur
                        />

                    </div>

                    <div className="password">
                        <label className="lable">Password*</label>
                        <input className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handleBlurPassword} // Validate on blur
                        />

                    </div>

                    <div>
                        <button type="button" className="signin_btn" onClick={handleSignIn}>
                            Sign In
                        </button>
                    </div>


                </form>
                <ToastContainer autoClose={1000} position="top-right" />
            </div>
        </>
    );
};

export default SignIn;