import React from "react";
// import '../../public/bundles/libscripts.bundle';
// import "path/to/e-learn.style.min.css"; // Import the required CSS
import "../assets/bundles/libscripts.bundle.js";
import "../assets/css/e-learn.style.min.css";
import logoblack from "../assets/images/logo-black.png"
import innspection from "../assets/images/inspect.jpg"
import googlImg from "../assets/images/google.svg";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';




const SignInPage = () => {

    const [EmailID, setEmailID] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}Login/LoginValidation`, {
                EmailID,
                password,
            });
            if (response.data.message == "Please provide valid Email Address") {
                setError(response.data.message);
            }
            else if (response.data.message == "Invalid Password Provided") {
                setError(response.data.message);
            }
            else {
                localStorage.setItem('uSeR_IF0', response.data.JSONToken);
                const decodedToken = jwtDecode(response.data.JSONToken);
                if (decodedToken.UserRole == "SuperAdmin") {
                    window.location.pathname = "SuperAdmin/Dashboard"
                }
                else if (decodedToken.UserRole == "CompanyAdmin") {
                    window.location.pathname = "/Dashboard"
                }
                else if (decodedToken.UserRole == "Auditor") {
                    window.location.pathname = "/ManageTemplates"
                }
                else if (decodedToken.UserRole == "Reviewer") {
                    window.location.pathname = "/ManageTemplates"
                }
                else{
                    window.location.pathname = "/NotFound"
                }
                // Save the token in localStorage or context
            }
            // Redirect or update state here
        } catch (err) {
            setError('Invalid credentials');
        }
    };


    return (
        <div id="elearn-layout" className="theme-black">
            {/* main body area */}
            <div className="main p-2 py-3 p-xl-5">
                {/* Body: Body */}
                <div className="body d-flex p-0 p-xl-5">
                    <div className="container-xxl">
                        <div className="row g-0">
                            <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100">
                                <div style={{ maxWidth: "25rem" }}>
                                    <div className="text-center mb-3">
                                        <img
                                            src={logoblack}
                                            width="100px"
                                            height="100px"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <h2 className="color-900 text-center">
                                            Inspection App for Professionals{" "}
                                        </h2>
                                    </div>
                                    {/* Image block */}
                                    <div className="">
                                        <img
                                            // src={"../assets/images/logo-black.png"}
                                            src={innspection}
                                            alt="innspection"
                                            width="100%"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
                                <div
                                    className="w-100 p-4 p-md-5 card border-0 bg-purple text-light"
                                    style={{ maxWidth: "32rem" }}
                                >
                                    {/* Form */}
                                    <form className="row g-1 p-0 p-4">
                                        <div className="col-12 text-center mb-5">
                                            <h1>Sign in</h1>
                                            <span>Free access to our dashboard.</span>
                                        </div>
                                        {/* <div className="col-12 text-center mb-4">
                                            <a className="btn btn-lg btn-primary btn-block" href="#">
                                                <span className="d-flex justify-content-center align-items-center">
                                                    <img
                                                        className="avatar xs me-2"
                                                        src={googlImg}
                                                        alt="Image Description"
                                                    />
                                                    Sign in with Google
                                                </span>
                                            </a>
                                            <span className="dividers mt-4">OR</span>
                                        </div> */}
                                        <div className="col-12">
                                            <div className="mb-2">
                                                <label className="form-label">Email address</label>
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    placeholder="name@example.com"
                                                    value={EmailID}
                                                    onChange={(e) => setEmailID(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-2">
                                                <div className="form-label">
                                                    <span className="d-flex justify-content-between align-items-center">
                                                        Password
                                                        <a className="text-primary" href="#">
                                                            Forgot Password?
                                                        </a>
                                                    </span>
                                                </div>
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    placeholder="***************"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    defaultValue=""
                                                    id="flexCheckDefault"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="flexCheckDefault"
                                                >
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

                                        <div className="col-12 text-center mt-4">
                                            <a
                                                className="btn btn-lg btn-block btn-light lift text-uppercase"
                                                atl="signin" onClick={handleSubmit}
                                            >
                                                SIGN IN
                                            </a>
                                        </div>
                                        <div className="col-12 text-center mt-4">
                                            <span className="">
                                                Don't have an account yet?{" "}
                                                <a href="#" className="text-primary">
                                                    Sign up here
                                                </a>
                                            </span>
                                        </div>
                                    </form>
                                    {/* End Form */}
                                    <div className="d-flex justify-content-between flex-wrap">
                                        <div>
                                            <a href="#" className="me-2">
                                                <i className="fa fa-facebook-square fa-lg" />
                                            </a>
                                            <a href="#" className="me-2">
                                                <i className="fa fa-github-square fa-lg" />
                                            </a>
                                            <a href="#" className="me-2">
                                                <i className="fa fa-linkedin-square fa-lg" />
                                            </a>
                                            <a href="#" className="me-2">
                                                <i className="fa fa-twitter-square fa-lg" />
                                            </a>
                                        </div>
                                        <div>
                                            <a href="#" title="home" className="me-2">
                                                Home
                                            </a>
                                            <a href="#" title="about" className="me-2">
                                                About Us
                                            </a>
                                            <a href="#" title="faq" className="me-2">
                                                FAQs
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        {/* End Row */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
