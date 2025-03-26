import React from "react";
// // import '../../public/bundles/libscripts.bundle';
// // import "path/to/e-learn.style.min.css"; // Import the required CSS
// import logoblack from "..//assets/images/logo-new.png"
// import Profilelogo from "..//assets/images/profile-teacher.jpg"
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const Usermanagement = () => {

  let [decodedToken, setDecodedToken] = useState(null);
  const [usersCount, setusersCount] = useState(0);
  const [SubscriptionCount, setSubscriptionCount] = useState(0);
  const [SubscriptionDueDate, setSubscriptionDueDate] = useState();
  const [UserName, setUserName] = useState("");
  const [UserMail, setUserMail] = useState("");
  const [UserRole, setUserRole] = useState("");
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState({
    username: '',
    email: '',
    status: '',
    activatedOn: ''
  });

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

      const response = await axios.get(`${process.env.REACT_APP_API_URL}SuperAdminDashboard/FetchAllUsersRecord`);
      debugger
      if (response.data != undefined) {
        setUsers(response.data);
      }

      // Redirect or update state here
    } catch (err) {
      console.log(err);
    }
  }

  const ResetUserInfo = async () => {
    try {

      const response = await axios.post(`${process.env.REACT_APP_API_URL}SuperAdminUserManagement/UpdateUserInfo`, {
        selectedUser
      });

      debugger

      if (response.data.message == "User Updated successfully") {
        alert(response.data.message)
      }
      else {
        alert(response.data.message)

      }
      // Redirect or update state here
    } catch (err) {
      console.log(err);
    }
  }

  const AddUserInfo = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}SuperAdminUserManagement/AddUserInfo`, {
        selectedUser
      });

      debugger

      if (response.data.message == "User Inserted successfully") {
        alert(response.data.message)
      }
      else {
        alert(response.data.message)

      }
    } catch (error) {

    }
  }

  const handleChange = (e) => {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value
    });
  };

  const DeleteUserInfo = async (id) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}SuperAdminUserManagement/DeleteUserInfo`, {
        id
      });

      if (response.data.message == "User Deleted successfully") {
        alert(response.data.message)
      }
      else {
        alert(response.data.message)
      }
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
      <link rel="icon" href="/assets/images/favicon.png" type="image/x-icon" />{" "}
      {/* Favicon*/}
      {/* project css file  */}
      <link rel="stylesheet" href="assets/css/e-learn.style.min.css" />
      <div id="elearn-layout" className="theme-purple">
        {/* sidebar */}
        <div className="sidebar px-4 py-4 py-md-4  me-0">
          <div className="d-flex flex-column h-100">
            <a  className="mb-0 brand-icon">
              <span className="logo-icon">
                <img src="/assets/images/logo-new.png" width="100%" />
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
                  <a className="m-link active" href="/UserManagement">
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
                      {/* <img class="avatar rounded-circle" src="/assets/images/xs/avatar2.jpg" alt="">
                                <img class="avatar rounded-circle" src="/assets/images/xs/avatar1.jpg" alt="">
                                <img class="avatar rounded-circle" src="/assets/images/xs/avatar3.jpg" alt="">
                                <img class="avatar rounded-circle" src="/assets/images/xs/avatar4.jpg" alt="">
                                <img class="avatar rounded-circle" src="/assets/images/xs/avatar7.jpg" alt="">
                                <img class="avatar rounded-circle" src="/assets/images/xs/avatar8.jpg" alt=""> */}
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
                                    src="/assets/images/xs/avatar1.jpg"
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
                                    src="/assets/images/xs/avatar3.jpg"
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
                                    src="/assets/images/xs/avatar5.jpg"
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
                                    src="/assets/images/xs/avatar6.jpg"
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
                                    src="/assets/images/xs/avatar7.jpg"
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
                        src="/assets/images/profile-teacher.jpg"
                        alt="profile"
                      />
                    </a>
                    <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                      <div className="card border-0 w280">
                        <div className="card-body pb-0">
                          <div className="d-flex py-1">
                            <img
                              className="avatar rounded-circle"
                              src="/assets/images/profile-teacher.jpg"
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
                            href="#"
                            className="list-group-item list-group-item-action border-0 "
                          >
                            <i className="icofont-ui-settings fs-6 me-3" />
                            User Settings
                          </a>
                          <a
                            href="#"
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
              <div className="row clearfix g-3">
                <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-12 order-lg-1 order-sm-2 order-2">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-dark">
                            <tr>
                              <th>User Name</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Status</th>
                              <th>Activated On</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.length > 0 ? (
                              users.map((user) => (
                                <tr key={user.id}>
                                  <td className="text-truncate">
                                    <div className="d-flex align-items-center">
                                      <div className="no-thumbnail">
                                        <img
                                          className="avatar rounded-circle"
                                          src={user.avatar || "/assets/images/xs/avatar1.jpg"} // Use user's avatar or fallback
                                          alt=""
                                        />
                                      </div>
                                      <div className="flex-fill ms-3 text-truncate">
                                        <h6 className="mb-0">{user.primary_user_name}</h6>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="mb-0">{user.company_email}</p>
                                  </td>
                                  <td>
                                    <span className="mb-used">
                                      <button
                                        className="btn btn-info text-white"
                                        data-bs-toggle="modal"
                                        data-bs-target="#update"
                                      >
                                        Update
                                      </button>
                                    </span>
                                  </td>
                                  <td>{user.status || "N/A"}</td>
                                  <td>{user.date || "N/A"}</td>
                                  <td>
                                    <div className="btn-group">
                                      <button
                                        type="button"
                                        className="btn rounded-1 dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        Action
                                      </button>
                                      <ul className="dropdown-menu dropdown-menu-end">
                                        <li>
                                          <a className="dropdown-item" href="#">
                                            Edit
                                          </a>
                                        </li>
                                        <li>
                                          <a className="dropdown-item" href="#">
                                            View
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => deleteUser(user.id)}
                                          >
                                            Delete
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6" className="text-center">
                                  No data available
                                </td>
                              </tr>
                            )}
                          </tbody>

                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 flex-lg-column  order-lg-2  order-sm-1 order-1">
                  <div className="sticky-lg-top">
                    <div className="row row-deck g-3">
                      <div className="col-12 col-sm-6 col-md-6 col-lg-12">
                        <div className="card  bg-purple">
                          <div className="card-body d-flex align-items-center justify-content-center flex-column">
                            <div className="preview-pane text-center">
                              <img
                                src="/assets/images/logo-new.png"
                                width="100px"
                                height="100px"
                              />
                              <span className="project-name display-5 fw-bold  d-flex justify-content-center color-defult">
                                InnSpect
                              </span>
                              <p className="fw-bold  fs-6 mt-2 color-defult">
                                Modified: <span id="datetime" />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-12">
                        <div className="card  color-bg-200">
                          <div className="card-header py-3">
                            <h6 className="mb-0 fw-bold ">User Type</h6>
                          </div>
                          <div className="card-body">
                            <div className="team-filter pb-3">
                              <div className="dropdown">
                                <button
                                  className="btn btn-dark dropdown-toggle w-100"
                                  type="button"
                                  id="dropdownMenuButton2"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  User Active
                                </button>
                                <ul
                                  className="dropdown-menu dropdown-menu-dark w-100"
                                  aria-labelledby="dropdownMenuButton2"
                                >
                                  <li>
                                    <a
                                      className="dropdown-item d-flex justify-content-between"
                                      href="#"
                                    >
                                      All User<span>15</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item active d-flex justify-content-between"
                                      href="#"
                                    >
                                      Active <span>2</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item d-flex justify-content-between"
                                      href="#"
                                    >
                                      Invited <span>8</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item d-flex justify-content-between"
                                      href="#"
                                    >
                                      Suspended <span>0</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item d-flex justify-content-between"
                                      href="#"
                                    >
                                      Deleted <span>5</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item d-flex justify-content-between"
                                      href="#"
                                    >
                                      Disconnected <span>0</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Row End */}
            </div>
          </div>
          {/* Modal  ResetPassword*/}
          <div
            className="modal fade"
            id="update"
            tabIndex={-1}
            aria-labelledby="resetpasswordLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title  fw-bold" id="resetpasswordLabel">
                    {" "}
                    Update
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                {/* //Edit Popup  */}
                <div className="modal-body justify-content-center flex-column d-flex">
                  <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                      value={selectedUser.username}
                      name="username"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                      value={selectedUser.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                      value={selectedUser.status}
                      name="status"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Activated ON</label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                      value={selectedUser.activatedOn}
                      name="activatedOn"
                      onChange={handleChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={AddUserInfo}
                  >
                    {/* Cancel */}
                    ADD
                  </button>
                  <button type="button" onClick={ResetUserInfo} className="btn btn-primary">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Jquery Core Js */}
          {/* Jquery Page Js */}
        </div>
      </div>
    </>



  );

};

export default Usermanagement;
