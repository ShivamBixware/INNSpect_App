import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ManageAuditTemplates = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [UserName, setUserName] = useState("");
  const [UserMail, setUserMail] = useState("");
  const [UserRole, setUserRole] = useState("");
  let [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();


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
    const fetchReports = async () => {
      try {
        debugger;
        const EmailID = decodedToken.company_email;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}ManageAuditTemplate/TemplateDetails`, {
          params: {
            EmailID: EmailID,
            userRole: decodedToken.UserRole
          },
        });
        if (response.data.Data != undefined)
          setTableData(response.data.Data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchReports();
  }, []);

  const btnNavigatetoTemplate = (e) => {
    try {
      debugger;
      const endPoint = decodedToken.UserRole == "Auditor" || decodedToken.UserRole == "CompanyAdmin" ? "TemplateView" : "TemplateReview"
      navigate(`/ManageTemplates/${endPoint}`, {
        state: {
          templateId: e.template_id,
          status: e.Template_Status,
          Location: e.Location[0],
          MasterID: e.Template_ID
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

      {/* Profile */}
      
        <div className="d-flex align-items-between justify-content-between mr-5 mr-lg-0 order-1" style={{ padding: "15px" }}>
            <div className="">
            <div style={{
            // alignItems: "center",
            padding: "20px 0",
            // backgroundColor: "#f9f9f9",
            // border: "1px solid #ddd",
            // borderRadius: "5px",
            // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}>
            <a
            href='/SetUp'
            style={{
                
                fontWeight: "bold",
                display: "flex",
                alignItems: "center"
            }}
            >
            <i class="icofont-bubble-left fs-3"></i>  <h3 className="fw-bold flex-fill">Manage Reports</h3>
            </a>
        </div>
            </div>
            <div className="d-flex align-items-center">

            
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
        
        <button className="navbar-toggler p-0 border-0 menu-toggle order-3" type="button" data-bs-toggle="collapse" data-bs-target="#mainHeader">
            <span className="fa fa-bars" />
        </button>
        </div>
     
      {/* // Content */}
       <div className="body d-flex m-0 p-0">
         <div className="container-xxl">
           <div className="row">
                {/* <div className="col-md-12">
                     
                      <div style={{ display: 'none', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
                        <button style={{ backgroundColor: '#926be6', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Search Filter</button>
                        <button style={{ backgroundColor: '#926be6', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Filter by Status</button>
                      </div>

                      {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='table-responsive' style={{
              height: "500px", // Set a fixed height for the table container
              overflowY: "auto", // Enable vertical scrolling
              border: "1px solid #ccc", // Optional: border for the scrollable container
            }}>
            <table className='table table-light'>
              <thead>
                <tr>
                  <th >Template Name</th>
                  <th>Assigned To</th>
                  <th>Approved By</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => {
                  // Update Template_Status if it's empty or null
                  const status = row.Template_Status === "" || row.Template_Status == null ? "Yet To Start" : row.Template_Status;

                  return (
                    <tr key={index} style={{ textAlign: 'center' }}>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{row.TemplateName}</td>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{row.user_MailID}</td>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{row.Reviewer_MailID}</td>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{row.Location}</td>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}>{status}</td>
                      <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                        <button onClick={() => btnNavigatetoTemplate(row)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                          <img src="/eye.png" alt="View" style={{ width: '20px', height: '20px' }} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        )
        }
        
                </div> */}
           </div>
         </div>
       </div>
    </div>
  );
};

export default ManageAuditTemplates;
