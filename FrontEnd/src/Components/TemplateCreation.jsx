import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const TemplateCreationModule = () => {
    const [companyData, setCompanyData] = useState({
        CompanyID: '',
        CompanyName: '',
        CompanyAddress: '',
        CompanyPhone: ''
    });

    const [companies, setCompanies] = useState([]);
    const [editing, setEditing] = useState(false); // Tracks if editing a company
    // const [editCompanyId, setEditCompanyId] = useState(null); // Holds the ID of the company being edited
    const [UserRole, setUserRole] = useState("");

    const navigate = useNavigate();

    // Fetch companies from the backend
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

        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}TemplateCreation/getTemplates`);
                debugger
                settemplates(response.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setCompanyData({
            ...companyData,
            [e.target.name]: e.target.value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editing) {
            // Update company if in editing mode
            try {
                await axios.put(`${process.env.REACT_APP_API_URL}ManageComapnies/editCompany`, companyData);
                alert('Company updated successfully');
                setEditing(false);
            } catch (error) {
                console.error('Error updating company:', error);
            }
        } else {
            // Add new company
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}ManageComapnies/SaveCompany`, companyData);
                alert('Company added successfully');
            } catch (error) {
                console.error('Error adding company:', error);
            }
        }

        // Reset form and refresh company list
        setCompanyData({ CompanyName: '', CompanyAddress: '', CompanyPhone: '' });
        const response = await axios.get(`${process.env.REACT_APP_API_URL}ManageComapnies/getCompanies`);
        setCompanies(response.data);
    };
    // Handle editing a company
    const handleEdit = (company) => {
        setEditing(true);
        setCompanyData({
            CompanyID: company.CompanyID,
            CompanyName: company.CompanyName,
            CompanyAddress: company.CompanyAddress,
            CompanyPhone: company.CompanyPhone
        });
    };

    const [category, setCategory] = useState("Retail");
    const [search, setSearch] = useState("");
    const [templates, settemplates] = useState([]);


    // Sample template data
    // const templates = [
    //     { id: 1, name: "Food Safety & Hygiene Checklist", questions: 179 },
    //     { id: 2, name: "Critical Figure of 8 Checklist", questions: 28 },
    //     { id: 3, name: "Pest Control Inspection Checklist", questions: 25 },
    //     { id: 4, name: "Shop Review - Monthly", questions: 84 },
    //     { id: 5, name: "Restaurant Health Inspection Checklist", questions: 34 },
    //     { id: 6, name: "Supermarket Parking Inspection", questions: 51 },
    //     { id: 7, name: "Daily Shop Checks", questions: 16 },
    //     { id: 8, name: "Retail Parking Checklist", questions: 40 },
    // ];

    // Sample categories
    const categories = [
        "Retail", "Construction", "Manufacturing", "Hotels & Vacation Rentals",
        "Food & Hospitality", "Transport & Automotive", "Facility & Services",
        "Health & Safety", "Venue & Events", "Healthcare", "ISO Standards",
        "Logistics & Supply Chain", "Property Inspection", "Warehouse",
        "Entertainment & Leisure", "IT & Data Center", "Fitness Centers & Spa",
        "Agro Tech & Industries"
    ];

    const btnNavigatetoTemplate = (e) => {
        try {
            debugger;
            navigate(`/TemplateCreation/${e.TemplateName}`, {
                state: {
                    templateId: e.ID
                }
            });
        } catch (error) {

        }
    }
    return (
        <div style={{ width: "100%" }}>

            {/* Sidebar */}
            <div className="sidebar px-4 py-4 py-md-4 me-0" style={{ width: "20%", marginRight: "20px", float: "left", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <div className="d-flex flex-column h-100">
                    <a className="mb-0 brand-icon" aria-label="Go to homepage">
                        <span className="logo-icon">
                            <img src="assets/images/logo-new.png" width="100%" alt="InnSpect logo" />
                        </span>
                        <span className="logo-text">InnSpect</span>
                    </a>
                    {/* Menu: main ul */}
                    {UserRole === "SuperAdmin" ? (
                        <ul className="menu-list flex-grow-1 mt-3">
                            <li><a className="m-link active" href="/SuperAdmin/Dashboard"><i className="icofont-ui-home" /><span>Dashboard</span></a></li>
                            <li><a className="m-link" href="/SuperAdmin/SetUp"><i className="icofont-file-document" /><span>Setup</span></a></li>
                            <li><a className="m-link" href="/SuperAdmin/Template"><i className="icofont-ui-clock" /><span>Templates</span></a></li>
                            <li><a className="m-link" href="/SuperAdmin/360view"><i className="icofont-star-e-Learn" /><span>360 View</span></a></li>
                            <li><a className="m-link" href="SuperAdmin/DataEntry"><i className="icofont-slidshare" /><span>Data Entry</span></a></li>
                            <li><a className="m-link" href="/SuperAdmin/UserManagement"><i className="icofont-man-in-glasses" /><span>User Management</span></a></li>
                            <li><a className="m-link" href="/SuperAdmin/Finance"><i className="icofont-group" /><span>Finance</span></a></li>
                        </ul>
                    ) : (
                        <ul className="menu-list flex-grow-1 mt-3">
                            <li><a className="m-link" href="/Dashboard"><i className="icofont-ui-home" /><span>Dashboard</span></a></li>
                            <li><a className="m-link" href="/SetUp"><i className="icofont-file-document" /><span>Setup</span></a></li>
                            {/* <li><a className="m-link" href="/Settings"><i className="icofont-ui-clock" /><span>Settings</span></a></li> */}
                            <li><a className="m-link active" href="/360view"><i className="icofont-star-e-Learn" /><span>360 View</span></a></li>
                            <li><a className="m-link" href="/UserManagement"><i className="icofont-man-in-glasses" /><span>User Management</span></a></li>
                        </ul>
                    )}
                    {/* Menu: menu collapse btn */}
                    <button type="button" className="btn btn-link sidebar-mini-btn text-light">
                        <span className="ms-2"><i className="icofont-bubble-right" /></span>
                    </button>
                </div>
            </div>

            {/* //**Profile */}
            {/* <div className="container-xxl" style={{ width:"20%" }}>
                {/* header rightbar icon */}

            <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1" style={{ float: "right", padding: "15px" }}>

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
                            src="assets/images/profile-teacher.jpg"
                            alt="profile"
                        />
                    </a>
                    <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                        <div className="card border-0 w280">
                            <div className="card-body pb-0">
                                <div className="d-flex py-1">
                                    <img
                                        className="avatar rounded-circle"
                                        src="assets/images/profile-teacher.jpg"
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
            <div style={{
                alignItems: "center",
                padding: "10px 20px",
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}>
                <a
                    href='/SetUp'
                    style={{
                        textDecoration: "none",
                        color: "#007bff",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <img
                        style={{
                            height: "7vh",
                            marginRight: "10px"
                        }}
                        src='/b4.png'
                        alt='Go Back'
                    />
                    Go Back
                </a>
            </div>
            <button
                className="navbar-toggler p-0 border-0 menu-toggle order-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mainHeader"
            >
                <span className="fa fa-bars" />
            </button>
            {/* main menu Search*/}

            {/* </div> */}

            {/* Content Area */}
            <div style={{ width: "75%", float: "right", padding: '25px', margin: '20px', fontFamily: 'Arial, sans-serif' }}>
                {/* Search and Dropdown Container */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search Template"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            marginRight: '10px',
                            marginBottom: '10px', // Ensures spacing in smaller viewports
                            minWidth: '200px'
                        }}
                    />
                    {/* Dropdown Menu */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            marginBottom: '10px',
                            minWidth: '150px'
                        }}
                    >
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Template List */}
                <div>
                    {templates.map((template, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '15px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                marginBottom: '10px',
                                backgroundColor: '#f9f9f9',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                            onClick={() => btnNavigatetoTemplate(template)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eef2f7'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                        >
                            <div>
                                <h3 style={{ margin: '0', fontSize: '16px' }}>{template.TemplateName}</h3>
                                <p style={{ margin: '0', color: '#888' }}>{template.Extra1} questions</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {/* Eye icon for preview */}
                                <span style={{ cursor: 'pointer' }}><i className="fas fa-eye" /></span>
                                {/* Chart icon for analytics */}
                                <span style={{ cursor: 'pointer' }}><i className="fas fa-chart-bar" /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>

    );
};


export default TemplateCreationModule;
