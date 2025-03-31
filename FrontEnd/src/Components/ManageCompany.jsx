import React from "react";
import logoblack from "../assets/images/logo-new.png";
import Profilelogo from "../assets/images/profile-teacher.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ManageCompany = () => {
  let [decodedToken, setDecodedToken] = useState(null);

  const [UserName, setUserName] = useState("");
  const [UserMail, setUserMail] = useState("");
  const [UserRole, setUserRole] = useState("");

  const [companyData, setCompanyData] = useState({
    CompanyID: "",
    CompanyName: "",
    CompanyAddress: "",
    CompanyPhone: "",
  });
  const [companies, setCompanies] = useState([]);
  const [editing, setEditing] = useState(false); // Tracks if editing a company

  useEffect(() => {
    const token = localStorage.getItem("uSeR_IF0");
    if (token) {
      try {
        // Decode the JWT token
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        // Set the decoded token in the component's state
        setDecodedToken(decoded);
        decodedToken = decoded;
        setUserName(decodedToken.primary_user_name);
        setUserMail(decodedToken.company_email);
        setUserRole(decodedToken.UserRole);
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    } else {
      alert("Invalid User");
    }

    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}ManageComapnies/getCompanies`
        );
        debugger;
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies Details:", error.message);
      }
    };
    fetchCompanies();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      // Update company if in editing mode
      try {
        await axios.put(
          `${process.env.REACT_APP_API_URL}ManageComapnies/editCompany`,
          companyData
        );
        alert("Company updated successfully");
        setEditing(false);
      } catch (error) {
        console.error("Error updating company:", error);
      }
    } else {
      // Add new company
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}ManageComapnies/SaveCompany`,
          companyData
        );
        alert("Company added successfully");
      } catch (error) {
        console.error("Error adding company:", error);
      }
    }

    // Reset form and refresh company list
    setCompanyData({ CompanyName: "", CompanyAddress: "", CompanyPhone: "" });
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}ManageComapnies/getCompanies`
    );
    setCompanies(response.data);
  };
  // Handle editing a company
  const handleEdit = (company) => {
    setEditing(true);
    setCompanyData({
      CompanyID: company.CompanyID,
      CompanyName: company.CompanyName,
      CompanyAddress: company.CompanyAddress,
      CompanyPhone: company.CompanyPhone,
    });
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>InnSpect</title>
      <link
        rel="icon"
        href="assets/images/favicon.png"
        type="image/x-icon"
      />{" "}
      {/* Favicon*/}
      {/* plugin css file  */}
      <link rel="stylesheet" href="assets/css/carousel.min.css" />
      {/* project css file  */}
      <link rel="stylesheet" href="assets/css/e-learn.style.min.css" />
      <div id="elearn-layout" className="theme-black">
        {/* sidebar */}
        <div className="sidebar px-4 py-4 py-md-4  me-0">
          <div className="d-flex flex-column h-100">
            <a className="mb-0 brand-icon">
              <span className="logo-icon">
                <img src={logoblack} width="100%" />
              </span>
              <span className="logo-text">InnSpect</span>
            </a>
            {/* Menu: main ul */}
            {UserRole == "SuperAdmin" ? (
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
            ) : (
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
              </ul>
            )}

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
                                <a
                                  href="javascript:void(0);"
                                  className="d-flex"
                                >
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
                                <a
                                  href="javascript:void(0);"
                                  className="d-flex"
                                >
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
                                <a
                                  href="javascript:void(0);"
                                  className="d-flex"
                                >
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
                                <a
                                  href="javascript:void(0);"
                                  className="d-flex"
                                >
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
                                    <span className="">
                                      Add folder on Server
                                    </span>
                                  </div>
                                </a>
                              </li>
                              <li className="py-2 mb-1 border-bottom">
                                <a
                                  href="javascript:void(0);"
                                  className="d-flex"
                                >
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
                                <a
                                  href="javascript:void(0);"
                                  className="d-flex"
                                >
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
                      {" "}
                      <i className="fa fa-search" />{" "}
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
            {/* First div - 1/3rd width */}
                <div className="col-lg-4 col-md-4 col-12">
                  <div className="card shadow-lg border-0 rounded-3 p-2">
                    <h3 className="text-center text-dark fw-bold mb-4">
                      Manage Companies
                    </h3>
                    <form onSubmit={handleSubmit}>
                {/* Company Name */}
                      <div className="mb-3">
                        <label className="form-label fw-bold"> Company Name </label>
                        <input
                          type="text"
                          className="form-control"
                          name="CompanyName"
                          value={companyData.CompanyName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                {/* Company Address */}
                      <div className="mb-3">
                        <label className="form-label fw-bold"> Company Address </label>
                        <input
                          type="text"
                          className="form-control"
                          name="CompanyAddress"
                          value={companyData.CompanyAddress}
                          onChange={handleChange}
                        />
                      </div>

                {/* Company Phone */}
                      <div className="mb-3">
                        <label className="form-label fw-bold"> Company Phone </label>
                        <input
                          type="text"
                          className="form-control"
                          name="CompanyPhone"
                          value={companyData.CompanyPhone}
                          onChange={handleChange}
                        />
                      </div>
                {/* Submit Button */}
                      <button
                         type="submit" className="btn bg-purple text-white fs-6 w-100 btn-lg lift">
                         {editing ? "Update Company" : "Add Company"}
                      </button>
                    </form>
                  </div>
                </div>

            {/* Second div - 2/3rd width */}
            <div className="col-lg-8 col-md-8 col-12">
              <div className="card shadow-lg border-0 rounded-3 p-2">
                    <h3 className="text-center text-dark mb-2 fw-bold">Company List</h3>
                    <div className="card border-0 rounded-3">
                    <div className="table-responsive" style={{ maxHeight: "400px", overflow: "auto" }}>
                        <table className="table table-hover align-middle mb-0 rounded-3">
                        <thead className="bg-purple text-white">
                            <tr>
                            <th className="rounded-start ps-3 white-space-nowrap">ID</th>
                            <th className="white-space-nowrap">Name</th>
                            <th className="white-space-nowrap">Address</th>
                            <th className="white-space-nowrap">Phone</th>
                            <th className="rounded-end pe-3 white-space-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.length > 0 ? (
                            companies.map((company) => (
                                <tr key={company.CompanyID}>
                                <td>{company.CompanyID}</td>
                                <td>{company.CompanyName}</td>
                                <td>{company.CompanyAddress}</td>
                                <td>{company.CompanyPhone}</td>
                                <td>
                                    <button 
                                    className="btn bg-purple text-white btn-sm me-2 px-3" 
                                    onClick={() => handleEdit(company)}
                                    >
                                    Edit 
                                    </button>
                                </td>
                                </tr>
                            ))
                            ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">
                                No companies found
                                </td>
                            </tr>
                            )}
                        </tbody>
                        </table>
                    </div>
                    </div>
              </div>
            </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCompany;
