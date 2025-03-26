import React from "react";
// import '../../public/bundles/libscripts.bundle';
// import "path/to/e-learn.style.min.css"; // Import the required CSS
import "../assets/bundles/libscripts.bundle.js";
import "../assets/css/e-learn.style.min.css";
import logoblack from "../assets/images/logo-new.png"
import Profilelogo from "../assets/images/profile-teacher.jpg"
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';



const SetUPSuperAdmin = () => {

  let [decodedToken, setDecodedToken] = useState(null);
  const [usersCount, setusersCount] = useState(0);
  const [SubscriptionCount, setSubscriptionCount] = useState(0);
  const [SubscriptionDueDate, setSubscriptionDueDate] = useState();
  const [UserRole, setUserRole] = useState("");



  useEffect(() => {

    const token = localStorage.getItem('uSeR_IF0');
    if (token) {
      try {
        // Decode the JWT token
        const decoded = jwtDecode(token);
        console.log('Decoded Token:', decoded);

        // Set the decoded token in the component's state
        setDecodedToken(decoded);
        decodedToken = decoded;
        setUserRole(decodedToken.UserRole)
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
    else {
      alert("Invalid User")
    }
    // pageload();

  }, [])



  const pageload = async () => {
    try {
      const EmailID = decodedToken.company_email;

      const response = await axios.post(`${process.env.REACT_APP_API_URL}SuperAdminDashboard/FetchSADBRecord`, {
        EmailID
      });

      if (response.data.result.recordsets[0][0].Subscripion != undefined) {
        setSubscriptionCount(response.data.result.recordsets[0][0].Subscripion);
      }
      if (response.data.result.recordsets[1][0] != undefined && response.data.result.recordsets[1][0].PaymentDueDate != undefined) {
        setSubscriptionDueDate(response.data.result.recordsets[1][0].PaymentDueDate.split('T')[0])
      }
      if (response.data.result.recordsets[2][0] != undefined && response.data.result.recordsets[2][0].CompanyUsersCount != undefined) {
        setusersCount(response.data.result.recordsets[2][0].CompanyUsersCount)
      }
      // Redirect or update state here
    } catch (err) {
      console.log(err);
    }
  }

  const navigateTo = (path) => {
    try {
      window.location.pathname = `${path}`
    } catch (error) {

    }
  }
  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>InnSpect</title>
      <link rel="icon" href="assets/images/favicon.png" type="image/x-icon" />{" "}
      {/* Favicon*/}
      {/* project css file  */}
      <link rel="stylesheet" href="assets/css/e-learn.style.min.css" />
      <div id="elearn-layout" className="theme-purple">
        {/* sidebar */}
        <div className="sidebar px-4 py-4 py-md-4  me-0">
          <div className="d-flex flex-column h-100">
            <a  className="mb-0 brand-icon">
              <span className="logo-icon">
                <img src={logoblack} width="100%" />
              </span>
              <span className="logo-text">InnSpect</span>
            </a>
            {/* Menu: main ul */}
            {UserRole == "SuperAdmin" ?
              <ul className="menu-list flex-grow-1 mt-3">
                <li>
                  <a className="m-link active" href="/SuperAdmin/Dashboard">
                    <i className="icofont-ui-home" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a className="m-link" href="/SuperAdmin/SetUp">
                    <i className="icofont-file-document" /> <span>Setup</span>
                  </a>
                </li>
                <li>
                  <a className="m-link" href="/SuperAdmin/Template">
                    <i className="icofont-ui-clock" /> <span>Templates</span>
                  </a>
                </li>
                <li>
                  <a className="m-link" href="/SuperAdmin/360view">
                    <i className="icofont-star-e-Learn" /> <span>360 View</span>
                  </a>
                </li>
                <li>
                  <a className="m-link" href="SuperAdmin/DataEntry">
                    <i className="icofont-slidshare" /> <span>Data Entry</span>
                  </a>
                </li>
                <li>
                  <a className="m-link" href="/SuperAdmin/UserManagement">
                    <i className="icofont-man-in-glasses" />{" "}
                    <span>User Management</span>
                  </a>
                </li>
                <li>
                  <a className="m-link" href="/SuperAdmin/Finance">
                    <i className="icofont-group" /> <span>Finance</span>
                  </a>
                </li>
              </ul>
              :
              <ul className="menu-list flex-grow-1 mt-3">
                <li>
                  <a className="m-link " href="/Dashboard">
                    <i className="icofont-ui-home" />
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a className="m-link active" href="/SetUp">
                    <i className="icofont-file-document" /> <span>Setup</span>
                  </a>
                </li>
                {/* <li>
                  <a className="m-link" href="/Settings">
                    <i className="icofont-ui-clock" /> <span>Settings</span>
                  </a>
                </li> */}
                <li>
                  <a className="m-link" href="/360view">
                    <i className="icofont-star-e-Learn" /> <span>360 View</span>
                  </a>
                </li>

                <li>
                  <a className="m-link" href="/UserManagement">
                    <i className="icofont-man-in-glasses" />{" "}
                    <span>User Management</span>
                  </a>
                </li>

              </ul>}
            {/* Theme: Switch Theme */}
            {/* <ul class="list-unstyled mb-0">
                <li class="d-flex align-items-center justify-content-center">
                    <div class="form-check form-switch theme-switch">
                        <input class="form-check-input" type="checkbox" id="theme-switch">
                        <label class="form-check-label" for="theme-switch">Enable Dark Mode!</label>
                    </div>
                </li>
                <li class="d-flex align-items-center justify-content-center">
                    <div class="form-check form-switch theme-rtl">
                        <input class="form-check-input" type="checkbox" id="theme-rtl">
                        <label class="form-check-label" for="theme-rtl">Enable RTL Mode!</label>
                    </div>
                </li>
            </ul> */}
            {/* Menu: menu collepce btn */}
            <button
              type="button"
              className="btn btn-link sidebar-mini-btn text-light"
            >
              <span className="ms-2">
                <i className="icofont-bubble-right" />
              </span>
            </button>
          </div>
        </div>
        {/* main body area */}
        <div className="main px-lg-4 px-md-4">
          {/* Body: Header */}
          <div className="header">
            <nav className="navbar py-4">
              <div className="container-xxl">
                {/* header rightbar icon */}
                <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">
                  <div className="d-flex">
                    <a
                      className="nav-link text-primary collapsed"
                      href="#"
                      title="Get Help"
                    >
                      {/* <i class="icofont-info-square fs-5"></i> */}
                    </a>
                    <div className="avatar-list avatar-list-stacked px-3">
                      {/* <img class="avatar rounded-circle" src="assets/images/xs/avatar2.jpg" alt="">
                                <img class="avatar rounded-circle" src="assets/images/xs/avatar1.jpg" alt="">
                                <img class="avatar rounded-circle" src="assets/images/xs/avatar3.jpg" alt="">
                                <img class="avatar rounded-circle" src="assets/images/xs/avatar4.jpg" alt="">
                                <img class="avatar rounded-circle" src="assets/images/xs/avatar7.jpg" alt="">
                                <img class="avatar rounded-circle" src="assets/images/xs/avatar8.jpg" alt=""> */}
                      <span
                        className="avatar rounded-circle text-center pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#addUser"
                      >
                        <i className="icofont-ui-add" />
                      </span>
                    </div>
                  </div>
                  <div className="dropdown notifications zindex-popover">
                    <a
                      className="nav-link dropdown-toggle pulse"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      <i className="icofont-alarm fs-5" />
                      <span className="pulse-ring" />
                    </a>
                    <div
                      id="NotificationsDiv"
                      className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-sm-end p-0 m-0"
                    >
                      <div className="card border-0 w380">
                        <div className="card-header border-0 p-3">
                          <h5 className="mb-0 font-weight-light d-flex justify-content-between">
                            <span>Notifications</span>
                            <span className="badge text-white">14</span>
                          </h5>
                        </div>
                        <div className="tab-content card-body">
                          <div className="tab-pane fade show active">
                            <ul className="list-unstyled list mb-0">
                              <li className="py-2 mb-1 border-bottom">
                                <a href="javascript:void(0);" className="d-flex">
                                  <img
                                    className="avatar rounded-circle"
                                    src="assets/images/xs/avatar1.jpg"
                                    alt=""
                                  />
                                  <div className="flex-fill ms-2">
                                    <p className="d-flex justify-content-between mb-0 ">
                                      <span className="font-weight-bold">
                                        Molly Cornish
                                      </span>{" "}
                                      <small>2MIN</small>
                                    </p>
                                    <span className="">
                                      Added 2021-02-19 e-Learn
                                      links_no_expiration_report.csv{" "}
                                      <span className="badge bg-success">
                                        Review
                                      </span>
                                    </span>
                                  </div>
                                </a>
                              </li>
                              <li className="py-2 mb-1 border-bottom">
                                <a href="javascript:void(0);" className="d-flex">
                                  <div className="avatar rounded-circle no-thumbnail">
                                    DF
                                  </div>
                                  <div className="flex-fill ms-2">
                                    <p className="d-flex justify-content-between mb-0 ">
                                      <span className="font-weight-bold">
                                        Diane Fisher
                                      </span>{" "}
                                      <small>13MIN</small>
                                    </p>
                                    <span className="">
                                      Server added Get Started with e-Learn.pdf
                                    </span>
                                  </div>
                                </a>
                              </li>
                              <li className="py-2 mb-1 border-bottom">
                                <a href="javascript:void(0);" className="d-flex">
                                  <img
                                    className="avatar rounded-circle"
                                    src="assets/images/xs/avatar3.jpg"
                                    alt=""
                                  />
                                  <div className="flex-fill ms-2">
                                    <p className="d-flex justify-content-between mb-0 ">
                                      <span className="font-weight-bold">
                                        Andrea Gill
                                      </span>{" "}
                                      <small>1HR</small>
                                    </p>
                                    <span className="">
                                      Server added Document.docx
                                    </span>
                                  </div>
                                </a>
                              </li>
                              <li className="py-2 mb-1 border-bottom">
                                <a href="javascript:void(0);" className="d-flex">
                                  <img
                                    className="avatar rounded-circle"
                                    src="assets/images/xs/avatar5.jpg"
                                    alt=""
                                  />
                                  <div className="flex-fill ms-2">
                                    <p className="d-flex justify-content-between mb-0 ">
                                      <span className="font-weight-bold">
                                        Diane Fisher
                                      </span>{" "}
                                      <small>13MIN</small>
                                    </p>
                                    <span className="">Add folder on Server</span>
                                  </div>
                                </a>
                              </li>
                              <li className="py-2 mb-1 border-bottom">
                                <a href="javascript:void(0);" className="d-flex">
                                  <img
                                    className="avatar rounded-circle"
                                    src="assets/images/xs/avatar6.jpg"
                                    alt=""
                                  />
                                  <div className="flex-fill ms-2">
                                    <p className="d-flex justify-content-between mb-0 ">
                                      <span className="font-weight-bold">
                                        Andrea Gill
                                      </span>{" "}
                                      <small>1HR</small>
                                    </p>
                                    <span className="">
                                      Delete folder on Server
                                    </span>
                                  </div>
                                </a>
                              </li>
                              <li className="py-2">
                                <a href="javascript:void(0);" className="d-flex">
                                  <img
                                    className="avatar rounded-circle"
                                    src="assets/images/xs/avatar7.jpg"
                                    alt=""
                                  />
                                  <div className="flex-fill ms-2">
                                    <p className="d-flex justify-content-between mb-0 ">
                                      <span className="font-weight-bold">
                                        Zoe Wright
                                      </span>{" "}
                                      <small className="">1DAY</small>
                                    </p>
                                    <span className="">
                                      The generated Lorem Ipsum
                                    </span>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <a
                          className="card-footer text-center border-top-0"
                          href="#"
                        >
                          {" "}
                          View all notifications
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center zindex-popover">
                    <div className="u-info me-2">
                      <p className="mb-0 text-end line-height-sm ">
                        <span className="font-weight-bold">Super Admin</span>
                      </p>
                      {/* <small>Teacher Profile</small> */}
                    </div>
                    <a
                      className="nav-link dropdown-toggle pulse p-0"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      data-bs-display="static"
                    >
                      <img
                        className="avatar lg rounded-circle img-thumbnail"
                        src={Profilelogo}
                        alt="profile"
                      />
                    </a>
                    <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                      <div className="card border-0 w280">
                        <div className="card-body pb-0">
                          <div className="d-flex py-1">
                            <img
                              className="avatar rounded-circle"
                              src={Profilelogo}
                              alt="profile"
                            />
                            <div className="flex-fill ms-3">
                              <p className="mb-0">
                                <span className="font-weight-bold">
                                  Super Admin
                                </span>
                              </p>
                              <small className="">superadmin@insspect.app</small>
                            </div>
                          </div>
                          <div>
                            <hr className="dropdown-divider border-dark" />
                          </div>
                        </div>
                        <div className="list-group m-2 ">
                          <a
                            href="users.html"
                            className="list-group-item list-group-item-action border-0 "
                          >
                            <i className="icofont-ui-settings fs-6 me-3" />
                            User Settings
                          </a>
                          <a
                            href="groups.html"
                            className="list-group-item list-group-item-action border-0 "
                          >
                            <i className="icofont-ui-user-group fs-6 me-3" />
                            View team &amp; groups
                          </a>
                          <a
                            href="/Login"
                            className="list-group-item list-group-item-action border-0 "
                          >
                            <i className="icofont-logout fs-6 me-3" />
                            Signout
                          </a>
                          <div>
                            <hr className="dropdown-divider border-dark" />
                          </div>
                          <a
                            href="#"
                            className="list-group-item list-group-item-action border-0 "
                          >
                            <i className="icofont-contact-add fs-5 me-3" />
                            Add personal account
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* menu toggler */}
                <button
                  className="navbar-toggler p-0 border-0 menu-toggle order-3"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#mainHeader"
                >
                  <span className="fa fa-bars" />
                </button>
                {/* main menu Search*/}
                <div className="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-3 mb-md-0 ">
                  <div className="input-group flex-nowrap input-group-lg">
                    <button
                      type="button"
                      className="input-group-text"
                      id="addon-wrapping"
                    >
                      <i className="fa fa-search" />
                    </button>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search"
                      aria-label="search"
                      aria-describedby="addon-wrapping"
                    />
                    <button
                      type="button"
                      className="input-group-text add-member-top"
                      id="addon-wrappingone"
                      data-bs-toggle="modal"
                      data-bs-target="#addUser"
                    >
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          {/* Body: Body */}
          <div className="body d-flex py-lg-3 py-md-2">
            <div className="container-xxl">
              <div className="row">
                <div className="col-md-12">
                  <div className="card border-0 mb-4 no-bg">
                    <div className="card-header py-3 px-0 d-flex align-items-center justify-content-between border-bottom">
                      <h3 className=" fw-bold flex-fill">Setup</h3>
                      {/* <div class="dropdown px-2">
                                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Category
                                    </button>
                                    <ul class="dropdown-menu  dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                      <li><a class="dropdown-item" href="#">Engineering</a></li>
                                      <li><a class="dropdown-item" href="#">Power and Energy</a></li>
                                      <li><a class="dropdown-item" href="#">Civil Law</a></li>
                                      <li><a class="dropdown-item" href="#">Legal Advice</a></li>
                                      <li><a class="dropdown-item" href="#">Health and Fitness</a></li>
                                      <li><a class="dropdown-item" href="#">Hospitality</a></li>
                                      <li><a class="dropdown-item" href="#">Aviation</a></li>
                                      <li><a class="dropdown-item" href="#">Drawing</a></li>
                                    </ul>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                        Status
                                    </button>
                                    <ul class="dropdown-menu  dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                      <li><a class="dropdown-item" href="#">All</a></li>
                                      <li><a class="dropdown-item" href="#">New Releases</a></li>
                                      <li><a class="dropdown-item" href="#">Popular</a></li>
                                    </ul>
                                </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3 py-3">
                <div className="col-lg-3 col-md-6 col-sm-6" onClick={()=>navigateTo("ManageCompany")}>
                  <div className="card">
                    <div className="lesson_name">
                      <div className="bg-primary d-flex justify-content-center align-items-center flex-column position-relative img-overlay">
                        <img
                          src="/assets/images/video-img/video1.jpg"
                          alt="course-img"
                          className="img-fluid"
                        />
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="avatar lg rounded-circle img-thumbnail d-flex justify-content-center align-items-center m-auto">
                            <i className="icofont-read-book fs-3 " />
                          </div>
                          <h6 className="mb-0 fw-bold text-white fs-6 text-center mt-3">
                            Manage Company
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-files-stack " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-clock-time " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-price " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-ui-rating " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card">
                    <div className="lesson_name">
                      <div className="bg-primary d-flex justify-content-center align-items-center flex-column position-relative img-overlay">
                        <img
                          src="/assets/images/video-img/video2.jpg"
                          alt="course-img"
                          className="img-fluid"
                        />
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="avatar lg rounded-circle img-thumbnail d-flex justify-content-center align-items-center m-auto">
                            <i className="icofont-read-book fs-3 " />
                          </div>
                          <h6 className="mb-0 fw-bold text-white fs-6 text-center mt-3">
                            Manage Locations
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-files-stack " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-clock-time " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-price " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-ui-rating " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6" onClick={()=>navigateTo("ManageTemplates")}>
                  <div className="card">
                    <div className="lesson_name">
                      <div className="bg-primary d-flex justify-content-center align-items-center flex-column position-relative img-overlay">
                        <img
                          src="/assets/images/video-img/video3.jpg"
                          alt="course-img"
                          className="img-fluid"
                        />
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="avatar lg rounded-circle img-thumbnail d-flex justify-content-center align-items-center m-auto">
                            <i className="icofont-read-book fs-3 " />
                          </div>
                          <h6 className="mb-0 fw-bold text-white fs-6 text-center mt-3">
                            My Innspects
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-files-stack " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-clock-time " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-price " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-ui-rating " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6" onClick={()=>navigateTo("EmailTemplate")}>
                  <div className="card">
                    <div className="lesson_name">
                      <div className="bg-primary d-flex justify-content-center align-items-center flex-column position-relative img-overlay">
                        <img
                          src="/assets/images/video-img/video4.jpg"
                          alt="course-img"
                          className="img-fluid"
                        />
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="avatar lg rounded-circle img-thumbnail d-flex justify-content-center align-items-center m-auto">
                            <i className="icofont-read-book fs-3 " />
                          </div>
                          <h6 className="mb-0 fw-bold text-white fs-6 text-center mt-3">
                            My Email Templates
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-files-stack " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-clock-time " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-price " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-ui-rating " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6" onClick={()=>navigateTo("TemplateCreation")}>
                  <div className="card">
                    <div className="lesson_name">
                      <div className="bg-primary d-flex justify-content-center align-items-center flex-column position-relative img-overlay">
                        <img
                          src="/assets/images/video-img/video5.jpg"
                          alt="course-img"
                          className="img-fluid"
                        />
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="avatar lg rounded-circle img-thumbnail d-flex justify-content-center align-items-center m-auto">
                            <i className="icofont-read-book fs-3 " />
                          </div>
                          <h6 className="mb-0 fw-bold text-white fs-6 text-center mt-3">
                            Innspect Template
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-files-stack " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-clock-time " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-price " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-ui-rating " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card">
                    <div className="lesson_name ">
                      <div className="bg-primary d-flex justify-content-center align-items-center flex-column position-relative img-overlay">
                        <img
                          src="/assets/images/video-img/video6.jpg"
                          alt="course-img"
                          className="img-fluid"
                        />
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="avatar lg rounded-circle img-thumbnail d-flex justify-content-center align-items-center m-auto">
                            <i className="icofont-read-book fs-3 " />
                          </div>
                          <h6 className="mb-0 fw-bold text-white fs-6 text-center mt-3">
                            Workflow
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-files-stack " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-clock-time " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-price " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-ui-rating " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card">
                    <div className="lesson_name ">
                      <div className="bg-primary d-flex justify-content-center align-items-center flex-column position-relative img-overlay">
                        <img
                          src="/assets/images/video-img/video7.jpg"
                          alt="course-img"
                          className="img-fluid"
                        />
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="avatar lg rounded-circle img-thumbnail d-flex justify-content-center align-items-center m-auto">
                            <i className="icofont-read-book fs-3 " />
                          </div>
                          <h6 className="mb-0 fw-bold text-white fs-6 text-center mt-3">
                            Scores
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-files-stack " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-clock-time " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-price " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-ui-rating " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card">
                    <div className="lesson_name ">
                      <div className="bg-primary d-flex justify-content-center align-items-center flex-column position-relative img-overlay">
                        <img
                          src="/assets/images/video-img/video9.jpg"
                          alt="course-img"
                          className="img-fluid"
                        />
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <div className="avatar lg rounded-circle img-thumbnail d-flex justify-content-center align-items-center m-auto">
                            <i className="icofont-read-book fs-3 " />
                          </div>
                          <h6 className="mb-0 fw-bold text-white fs-6 text-center mt-3">
                            Assign
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-files-stack " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-clock-time " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-price " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="icofont-ui-rating " />
                            <span className="ms-2"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal Members*/}
          <div
            className="modal fade"
            id="addUser"
            tabIndex={-1}
            aria-labelledby="addUserLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title  fw-bold" id="addUserLabel">
                    Invite Friend's
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <div className="inviteby_email">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Members Invite"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button
                        className="btn btn-dark"
                        type="button"
                        id="button-addon2"
                      >
                        Members Invite
                      </button>
                    </div>
                  </div>
                  <div className="members_list">
                    <h6 className="fw-bold ">Members of e-Learn</h6>
                    <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
                      <li className="list-group-item py-3 text-center text-md-start">
                        <div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
                          <div className="no-thumbnail mb-2 mb-md-0">
                            <img
                              className="avatar lg rounded-circle"
                              src="assets/images/xs/avatar2.jpg"
                              alt=""
                            />
                          </div>
                          <div className="flex-fill ms-3 text-truncate">
                            <h6 className="mb-0  fw-bold">Rachel Carr(you)</h6>
                            <span className="text-muted">
                              rachel.carr@gmail.com
                            </span>
                          </div>
                          <div className="members-action">
                            <span className="members-role ">Admin</span>
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn bg-transparent dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="icofont-ui-settings  fs-6" />
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="icofont-ui-password fs-6 me-2" />
                                    ResetPassword
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="icofont-chart-line fs-6 me-2" />
                                    ActivityReport
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item py-3 text-center text-md-start">
                        <div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
                          <div className="no-thumbnail mb-2 mb-md-0">
                            <img
                              className="avatar lg rounded-circle"
                              src="assets/images/xs/avatar3.jpg"
                              alt=""
                            />
                          </div>
                          <div className="flex-fill ms-3 text-truncate">
                            <h6 className="mb-0  fw-bold">
                              Lucas Baker
                              <a href="#" className="link-secondary ms-2">
                                (Resend invitation)
                              </a>
                            </h6>
                            <span className="text-muted">
                              lucas.baker@gmail.com
                            </span>
                          </div>
                          <div className="members-action">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn bg-transparent dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Members
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="icofont-check-circled" />
                                    Member
                                    <span>
                                      Can view, edit, delete, comment on and save
                                      files
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="fs-6 p-2 me-1" />
                                    Admin
                                    <span>
                                      Member, but can invite and manage team members
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn bg-transparent dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="icofont-ui-settings  fs-6" />
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="icofont-delete-alt fs-6 me-2" />
                                    Delete Member
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item py-3 text-center text-md-start">
                        <div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
                          <div className="no-thumbnail mb-2 mb-md-0">
                            <img
                              className="avatar lg rounded-circle"
                              src="assets/images/xs/avatar8.jpg"
                              alt=""
                            />
                          </div>
                          <div className="flex-fill ms-3 text-truncate">
                            <h6 className="mb-0  fw-bold">Una Coleman</h6>
                            <span className="text-muted">
                              una.coleman@gmail.com
                            </span>
                          </div>
                          <div className="members-action">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn bg-transparent dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Members
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="icofont-check-circled" />
                                    Member
                                    <span>
                                      Can view, edit, delete, comment on and save
                                      files
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    <i className="fs-6 p-2 me-1" />
                                    Admin
                                    <span>
                                      Member, but can invite and manage team members
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="btn-group">
                              <div className="btn-group">
                                <button
                                  type="button"
                                  className="btn bg-transparent dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="icofont-ui-settings  fs-6" />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="icofont-ui-password fs-6 me-2" />
                                      ResetPassword
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="icofont-chart-line fs-6 me-2" />
                                      ActivityReport
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="icofont-delete-alt fs-6 me-2" />
                                      Suspend member
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="icofont-not-allowed fs-6 me-2" />
                                      Delete Member
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Jquery Core Js */}
      {/* Jquery Page Js */}
    </>


  );

};

export default SetUPSuperAdmin;
