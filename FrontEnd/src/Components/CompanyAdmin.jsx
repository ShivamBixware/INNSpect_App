import React from "react";
// import '../../public/bundles/libscripts.bundle';
// import "path/to/e-learn.style.min.css"; // Import the required CSS
import logoblack from "../assets/images/logo-new.png"
import Profilelogo from "../assets/images/profile-teacher.jpg"
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';



const CompanyAdmin = () => {

    let [decodedToken, setDecodedToken] = useState(null);
    const [usersCount, setusersCount] = useState(0);
    const [SubscriptionCount, setSubscriptionCount] = useState(0);
    const [SubscriptionDueDate, setSubscriptionDueDate] = useState();
    const [UserName, setUserName] = useState("");
    const [UserMail, setUserMail] = useState("");
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
                setUserName(decodedToken.primary_user_name)
                setUserMail(decodedToken.company_email)
                setUserRole(decodedToken.UserRole)

            } catch (error) {
                console.error('Error decoding JWT token:', error);
            }
        }
        else {
            alert("Invalid User")
        }
        pageload();

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
            {/* plugin css file  */}
            <link rel="stylesheet" href="assets/css/carousel.min.css" />
            {/* project css file  */}
            <link rel="stylesheet" href="assets/css/e-learn.style.min.css" />
            <div id="elearn-layout" className="theme-black">
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
                                    <a className="m-link active" href="/Dashboard">
                                        <i className="icofont-ui-home" />
                                        <span>Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="m-link" href="/SetUp">
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
                                                <span className="font-weight-bold">{UserName}</span>
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
                                                                    {UserName}
                                                                </span>
                                                            </p>
                                                            <small className="">{UserMail}</small>
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
                                                    <div>x``
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
                            <div className="row clearfix row-deck g-3">
                                <div className="col-lg-12 col-md-12 flex-column">
                                    <div className="row g-3 pb-3">
                                        <div className="col-4 col-xl-4 col-lg-4">
                                            <div className="card mb-3 color-bg-200">
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col-12 col-lg-5 order-lg-2">
                                                            <div className="text-center p-4">
                                                                <img
                                                                    src="/assets/images/study.svg"
                                                                    alt="..."
                                                                    className="img-fluid set-md-img"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-lg-7 order-lg-1">
                                                            <h3 className=" mb-3">
                                                                Welcome back, <span className="fw-bold">Molly</span>
                                                            </h3>
                                                            <p className="line-height-custom mb-2">
                                                                Lorem ipsum dolor sit amet, consectetur adipiscing
                                                                elit, sed do eiusmod tempor incididunt{" "}
                                                            </p>
                                                            <a
                                                                className="btn bg-purple text-light btn-lg lift"
                                                                href="#"
                                                            >
                                                                Free Inquire
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="col-md-12">
                                                <div className="card color-bg-200 mb-1">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar lg  rounded-1 no-thumbnail bg-lightyellow color-defult">
                                                                <i className="bi bi-people-fill fs-4" />
                                                            </div>
                                                            <div className="flex-fill ms-3 text-truncate">
                                                                <div className="">Users </div>
                                                                <h5 className="mb-0 ">{usersCount}</h5>
                                                            </div>
                                                            <a
                                                                href="#"
                                                                title="view-members"
                                                                className="btn btn-link text-decoration-none  rounded-1"
                                                            >
                                                                <i className="icofont-dotted-right fs-2 " />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="card color-bg-200 mb-1">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar lg  rounded-1 no-thumbnail bg-lightblue color-defult">
                                                                <i className="bi bi-hdd-network-fill fs-4" />
                                                            </div>
                                                            <div className="flex-fill ms-3 text-truncate">
                                                                <div className="">Subscriptions</div>
                                                                <h5 className="mb-0 ">{SubscriptionCount}</h5>
                                                            </div>
                                                            <a
                                                                href="#"
                                                                title="space-used"
                                                                className="btn btn-link text-decoration-none  rounded-1"
                                                            >
                                                                <i className="icofont-dotted-right fs-2 " />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="card color-bg-200 mb-1">
                                                    <div className="card-body">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar lg  rounded-1 no-thumbnail bg-lightgreen color-defult">
                                                                <i className="bi bi-calendar3-range-fill fs-4" />
                                                            </div>
                                                            <div className="flex-fill ms-3 text-truncate">
                                                                <div className="">Renewal date</div>
                                                                <h5 className="mb-0 ">{SubscriptionDueDate}</h5>
                                                            </div>
                                                            <a
                                                                href="#"
                                                                title="renewal-date"
                                                                className="btn btn-link text-decoration-none  rounded-1"
                                                            >
                                                                <i className="icofont-dotted-right fs-2 " />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-12">
                                            <div className="card mb-0 color-bg-200">
                                                <div className="card-body">
                                                    <div className="licences_used">
                                                        <h6 className="mb-0 fw-bold ">
                                                            Licences used for Members
                                                        </h6>
                                                        <div id="apex-circle-gradient" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="card-header py-3 px-0 no-bg border-0">
                                                <h6 className="mb-0 fw-bold ">Numbers to watch</h6>
                                                <span>What happened in e-Learn in the last 7 days?</span>
                                            </div>
                                            <div className="row row-deck">
                                                <div className="col-12 col-sm-12 col-md-6 mb-sm-3 mb-md-0 mb-3">
                                                    <div className="card-body color-bg-200 rounded-3">
                                                        <div className="info-watch d-flex justify-content-between align-items-center">
                                                            <span className=" fw-bold">
                                                                Links with no expiry date
                                                            </span>
                                                            <button
                                                                type="button"
                                                                className="btn p-0"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                title="An expiry date disables a link on specific date to help leep your files secure"
                                                            >
                                                                <i className="bi bi-info-circle-fill " />
                                                            </button>
                                                        </div>
                                                        <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0 mt-3">
                                                            <li className="list-group-item py-3 color-bg-200">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar lg rounded-circle no-thumbnail no-bg">
                                                                        <i className="icofont-users-alt-5  fs-2" />
                                                                    </div>
                                                                    <div className="flex-fill ms-3">
                                                                        <span className=" fw-bold">15</span>
                                                                        <h6 className="mb-0 ">
                                                                            Created by team members.
                                                                        </h6>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-dark lift"
                                                                    >
                                                                        <i className="icofont-file-excel fs-6" />
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item py-3 color-bg-200">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar lg rounded-circle no-thumbnail no-bg">
                                                                        <i className="icofont-people  fs-2" />
                                                                    </div>
                                                                    <div className="flex-fill ms-3">
                                                                        <span className=" fw-bold">03</span>
                                                                        <h6 className="mb-0 ">
                                                                            People outside your team
                                                                        </h6>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-dark lift"
                                                                    >
                                                                        <i className="icofont-file-excel fs-6" />
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6 mb-md-0">
                                                    <div className="card-body bg-primary rounded-3">
                                                        <div className="info-watch d-flex justify-content-between align-items-center">
                                                            <span className="text-white fw-bold">
                                                                Links with no password
                                                            </span>
                                                            <button
                                                                type="button"
                                                                className="btn p-0"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="left"
                                                                title="Passwords add an extra layer of security when sharing with a link"
                                                            >
                                                                <i className="bi bi-info-circle-fill text-white" />
                                                            </button>
                                                        </div>
                                                        <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0 mt-3">
                                                            <li className="list-group-item py-3 bg-primary">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar lg rounded-circle no-thumbnail no-bg">
                                                                        <i className="icofont-users-alt-5 text-white fs-2" />
                                                                    </div>
                                                                    <div className="flex-fill ms-3">
                                                                        <span className="text-white fw-bold">05</span>
                                                                        <h6 className="mb-0 text-white">
                                                                            Created by team members.
                                                                        </h6>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn  lift bg-white "
                                                                    >
                                                                        <i className="icofont-file-excel fs-6 " />
                                                                    </button>
                                                                </div>
                                                            </li>
                                                            <li className="list-group-item py-3 bg-primary">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar lg rounded-circle no-thumbnail no-bg">
                                                                        <i className="icofont-unique-idea text-white fs-2" />
                                                                    </div>
                                                                    <div className="flex-fill ms-3">
                                                                        <span className="text-white fw-bold">12</span>
                                                                        <h6 className="mb-0 text-white">
                                                                            unique views of links shared externally.
                                                                        </h6>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn  lift bg-white "
                                                                    >
                                                                        <i className="icofont-file-excel fs-6 " />
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Row End */}
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
                                            Manage team members
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
                                                                                Member, but can invite and manage team
                                                                                members
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
                                                                                Member, but can invite and manage team
                                                                                members
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
                {/* Plugin Js*/}
                {/* Jquery Page Js */}
            </div>
        </>

    );

};

export default CompanyAdmin;
