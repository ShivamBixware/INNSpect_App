import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Typography,
  Box,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const EmailTemplateModule = () => {
  const [templates, setTemplates] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [formData, setFormData] = useState({ name: "", subject: "", body: "" });

  const [UserName, setUserName] = useState("");
  const [UserMail, setUserMail] = useState("");
  const [UserRole, setUserRole] = useState("");
  let [decodedToken, setDecodedToken] = useState(null);


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

    const fetchEmailTemplates = async () => {
      try {
        debugger
        const response = await axios.get(`${process.env.REACT_APP_API_URL}EmailTemplate/FetchEmailTemplates`, {
          params: {
            clientID: decodedToken.id
          },
        });
        debugger
        if (response.data.message != undefined) {
          alert(response.data.message)
        }
        else {
          setTemplates(response.data);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchEmailTemplates();
  }, []);


  const handleOpenModal = (template = null) => {
    setCurrentTemplate(template);
    if (template != null) {
      setFormData({ name: template.MailName, subject: template.MailSubject, body: template.MailContent });
    }
    else{
      setFormData({ name: "", subject: "", body: "" });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      debugger
      const response = await axios.post(`${process.env.REACT_APP_API_URL}EmailTemplate/AddNewMailTemplate`, {
        params: {
          EmailDetails: formData,
          clientID: decodedToken.id,
          currentTemplate: currentTemplate
        },
      });
      debugger
      if (response.data.message == "Email Template Inserted  successfully") {

        const newTemplate = {
          id: templates.length + 1, // Generate a new unique id
          MailName: formData.name,
          MailSubject: formData.subject,
          MailContent: formData.body,
        };
        if (currentTemplate == null) {

          setTemplates((prevTemplates) => [...prevTemplates, newTemplate]);
        }
        else {
          debugger
          setTemplates((prevTemplates) =>
            prevTemplates.map((template) =>
              template.Id === currentTemplate.Id
                ? { ...template, ...newTemplate }
                : template
            )
          );

        }
        setFormData({ name: "", subject: "", body: "" });
      }

      else {

        alert(response.data.message)

      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
    //   setTemplates((prev) =>
    //     prev.map((t) => (t.id === currentTemplate.id ? { ...t, ...formData } : t))
    //   );
    // } else {
    //   setTemplates((prev) => [...prev, { id: Date.now(), ...formData }]);
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    alert(id)
    const response = await axios.post(`${process.env.REACT_APP_API_URL}EmailTemplate/deleteMailTemplate`, { id })
    if (response.data.message == "Mail Template Deleted successfully") {
      setTemplates((prev) => prev.filter((t) => t.Id !== id));
    }
    else {
      alert(response.data.message);
    }

  };

  return (
    // <div style={{ padding: "20px" }}>
    //   <Typography variant="h4" gutterBottom>
    //     Email Templates
    //   </Typography>
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     startIcon={<Add />}
    //     onClick={() => handleOpenModal()}
    //   >
    //     Create New Template
    //   </Button>
    //   <TableContainer style={{ marginTop: "20px" }}>
    //     <Table>
    //       <TableHead>
    //         <TableRow>
    //           <TableCell>Name</TableCell>
    //           <TableCell>Subject</TableCell>
    //           <TableCell>Actions</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {templates.map((template) => (
    //           <TableRow key={template.Id}>
    //             <TableCell>{template.MailName}</TableCell>
    //             <TableCell>{template.MailSubject}</TableCell>
    //             <TableCell>
    //               <Button
    //                 startIcon={<Edit />}
    //                 color="primary"
    //                 onClick={() => handleOpenModal(template)}
    //               >
    //                 Edit
    //               </Button>
    //               <Button
    //                 startIcon={<Delete />}
    //                 color="secondary"
    //                 onClick={() => handleDelete(template.Id)}
    //               >
    //                 Delete
    //               </Button>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>

    //   <Modal open={openModal} onClose={handleCloseModal}>
    //     <Box
    //       sx={{
    //         position: "absolute",
    //         top: "50%",
    //         left: "50%",
    //         transform: "translate(-50%, -50%)",
    //         bgcolor: "background.paper",
    //         boxShadow: 24,
    //         p: 4,
    //         borderRadius: 2,
    //         width: "400px",
    //       }}
    //     >
    //       <Typography variant="h6" gutterBottom>
    //         {currentTemplate ? "Edit Template" : "Create Template"}
    //       </Typography>
    //       <TextField
    //         fullWidth
    //         label="Name"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleChange}
    //         margin="normal"
    //       />
    //       <TextField
    //         fullWidth
    //         label="Subject"
    //         name="subject"
    //         value={formData.subject}
    //         onChange={handleChange}
    //         margin="normal"
    //       />
    //       <TextField
    //         fullWidth
    //         label="Body"
    //         name="body"
    //         value={formData.body}
    //         onChange={handleChange}
    //         margin="normal"
    //         multiline
    //         rows={4}
    //       />
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         fullWidth
    //         onClick={handleSave}
    //         style={{ marginTop: "16px" }}
    //       >
    //         Save
    //       </Button>
    //     </Box>
    //   </Modal>
    // </div>

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

      {/* //**Profile */}.

      {/* <div className="container-xxl" style={{ width:"20%" }}>
    {/* header rightbar icon */}
      <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1" style={{float:"right", padding:"15px"}}>
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
      <div style={{ width: "75%", float:"right", padding: '15px', margin: '20px'}}>
        <Typography variant="h4" gutterBottom>
          Email Templates
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenModal()}
        >
          Create New Template
        </Button>
        <TableContainer style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.Id}>
                  <TableCell>{template.MailName}</TableCell>
                  <TableCell>{template.MailSubject}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<Edit />}
                      color="primary"
                      onClick={() => handleOpenModal(template)}
                    >
                      Edit
                    </Button>
                    <Button
                      startIcon={<Delete />}
                      color="secondary"
                      onClick={() => handleDelete(template.Id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: "400px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {currentTemplate ? "Edit Template" : "Create Template"}
            </Typography>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSave}
              style={{ marginTop: "16px" }}
            >
              Save
            </Button>
          </Box>
        </Modal>
      </div>


    </div>
  );
};

export default EmailTemplateModule;