import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';
import localforage from 'localforage';
import { Height } from '@mui/icons-material';
import { height } from '@mui/system';

const AuditTemplateView = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [UserName, setUserName] = useState("");
  const [UserMail, setUserMail] = useState("");
  const [UserRole, setUserRole] = useState("");
  let [decodedToken, setDecodedToken] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showComment, setShowComment] = useState({});
  const [showPhotoUpload, setShowPhotoUpload] = useState({});
  const [showAssignUsersPanel, setShowAssignUsersPanel] = useState(false);
  const [showAssignUsersModal, setshowAssignUsersModal] = useState(true); // Tracks if editing a company
  const [AssignedUserMailID, setAssignedUserMailID] = useState("");
  const [templateID, settemplateID] = useState({});
  const [status, setstatus] = useState({});
  const [photoToShow, setPhotoToShow] = useState(null);
  const [HeadingName, setHeadingName] = useState(null);




  // Handle option click by adding the answer directly to the question
  const handleOptionClick = (questionId, option) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === questionId ? { ...question, answer: option } : question
      )
    );
  };
  const data = location.state.templateId; // Accessing the passed state


  useEffect(() => {
    const token = localStorage.getItem('uSeR_IF0');
    settemplateID(data)
    setstatus(location.state.status)


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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}ManageAuditTemplate/FetchTemplateData`, {
          params: {
            TemplateID: data,
            MailID: decodedToken.company_email,
            UserRole: decodedToken.UserRole,
            Location: location.state.Location
          },
        });
        debugger;

        setQuestions(JSON.parse(response.data.Data[0].Questions));
        setHeadingName(response.data.Data[0].TemplateName)
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchReports();
  }, []);
  useEffect(() => {
    console.log("showAssignUsersModal:", showAssignUsersModal);
  }, [showAssignUsersModal]);

  // Set up online/offline event listeners once
  useEffect(() => {
    window.addEventListener('online', syncOfflineData);
    return () => {
      window.removeEventListener('online', syncOfflineData);
    };
  }, []);

  const btnNavigatetoTemplate = (e) => {
    try {
      debugger;
      navigate('/ManageTemplates/TemplateView', { state: e.template_id });
    } catch (error) {

    }
  }

  // Toggle textarea for comments
  const toggleComment = (questionId) => {
    setShowComment(prevState => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  // Toggle photo upload input
  const togglePhotoUpload = (questionId) => {
    setShowPhotoUpload(prevState => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };

  // const SaveTemplate = async () => {
  //   const allQuestionsAnswered = questions.every(question => question.answer);

  //   if (!allQuestionsAnswered) {
  //     alert("Please answer all questions before saving the template.");
  //     return;
  //   }
  //   debugger;

  //   window.addEventListener('online', () => {
  //     console.log('You are online');
  //     // Sync any offline data saved in IndexedDB to the backend here
  //     try {
  //       const Data = {
  //         Questions: questions,
  //         TemplateID: data,
  //       };

  //       const response = await axios.post(`${process.env.REACT_APP_API_URL}ManageAuditTemplate/SaveAuditTemplate`, Data);

  //       if (response.data.message === "Template Inserted successfully") {
  //         alert(response.data.message);
  //       } else {
  //         alert(response.data.message);
  //       }
  //     } catch (error) {
  //       console.error('Error in SaveTemplate:', error);
  //     }

  //   });

  //   window.addEventListener('offline', () => {
  //     console.log('You are offline');
  //     // Data will be saved to IndexedDB when offline
  //     localforage.setItem('TemplateData', questions)
  //       .then(() => console.log('Data saved to IndexedDB'))
  //       .catch(error => console.error('Failed to save to IndexedDB', error));
  //   });
  // };



  const SaveTemplate = async () => {
    const allQuestionsAnswered = questions.every(question => question.answer);

    if (!allQuestionsAnswered) {
      alert("Please answer all questions before saving the template.");
      return;
    }

    const Data = {
      Questions: questions,
      TemplateID: data,
    };

    if (navigator.onLine) {
      // Attempt to save online
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}ManageAuditTemplate/SaveAuditTemplate`, Data);

        if (response.data.message === "Template Inserted successfully") {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error in SaveTemplate:', error);
        alert('Failed to save online. Data will be saved offline instead.');
        // Save offline in case of an error
        await localforage.setItem('TemplateData', Data);
      }
    } else {
      // Save to IndexedDB if offline
      console.log('You are offline, saving to IndexedDB');
      await localforage.setItem('TemplateData', Data);
      alert('You are offline. Data has been saved offline and will sync when online.');
    }
  };

  // Sync offline data when back online
  const syncOfflineData = async () => {
    const offlineData = await localforage.getItem('TemplateData');
    if (offlineData) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}ManageAuditTemplate/SaveAuditTemplate`, offlineData);
        if (response.data.message === "Template Inserted successfully") {
          alert('Offline data synced successfully.');
          // Remove the offline data after successful sync
          await localforage.removeItem('TemplateData');
        }
      } catch (error) {
        console.error('Failed to sync offline data:', error);
      }
    }
  };


  const handleFileUpload = async (questionId, file) => {
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}ManageAuditTemplate/uploadImage?clientName=${decodedToken.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Get the URL from the response
      const imageUrl = response.data.imageUrl;

      // Update the specific question's photo property
      setQuestions(prevQuestions =>
        prevQuestions.map(q =>
          q.id === questionId ? { ...q, photo: imageUrl } : q
        )
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleComment = (id, val) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === id
          ? { ...question, comment: val }
          : question
      )
    );
  }

  const handleUpdate = (id, val) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(photo =>
        photo.id === id
          ? { ...photo, photo: val }
          : photo
      )
    );
  }

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer'
  };

  const actionButtonStyle = {
    padding: '5px 10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer'
  };

  // Modal styling for the photo viewer
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const photoStyle = {
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: '8px',
  };
  // Function to handle showing the photo in a modal
  const handlePhotoClick = (url) => {
    setPhotoToShow(url);
  };

  // Close the modal
  const handleClosePhoto = () => {
    setPhotoToShow(null);
  };

  return (
    <>
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "5px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
      }}>
        <a
          href='/ManageTemplates'
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

      <div style={{ padding: '20px', paddingTop: "20px", paddingBottom: "80px" }}>
        <h3 style={{ backgroundColor: '#2d3e50', color: 'white', padding: '10px' }}>{HeadingName}</h3>
        {questions.map((question, index) => (
          <div
            key={question.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: '#fff'
            }}
          >
            {/* {editMode ?
                                // <input>{index + 1}. {question.text}</input>
                                <input type="text" name={question.text} value={index + 1 + ". " + question.text} placeholder="Enter your name" />

                                : */}

            <h4>{index + 1}. {question.text}</h4>
            {/* } */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: question.answer === "Yes" ? '#28a745' : '#f0f0f0',
                  color: question.answer === "Yes" ? '#fff' : '#000'
                }}
                onClick={() => status === null && UserRole != 'CompanyAdmin' && handleOptionClick(question.id, "Yes")}
              >
                Yes
              </button>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: question.answer === "No" ? '#dc3545' : '#f0f0f0',
                  color: question.answer === "No" ? '#fff' : '#000'
                }}
                onClick={() => status === null && UserRole != 'CompanyAdmin' && handleOptionClick(question.id, "No")}
              >
                No
              </button>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: question.answer === "N/A" ? '#ffc107' : '#f0f0f0',
                  color: question.answer === "N/A" ? '#fff' : '#000'
                }}
                onClick={() => status === null && UserRole != 'CompanyAdmin' && handleOptionClick(question.id, "N/A")}
              >
                N/A
              </button>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>

              <button style={actionButtonStyle} onClick={() => status === null && UserRole != 'CompanyAdmin' && togglePhotoUpload(question.id)}>📷 Photo</button>
              <button style={actionButtonStyle} onClick={() => status === null && UserRole != 'CompanyAdmin' && toggleComment(question.id)}>📝 Comment</button>
            </div>

            {(showPhotoUpload[question.id] && status === null && UserRole != 'CompanyAdmin') ? (
              // If showPhotoUpload is true and there's no photo, show the file input for upload
              <input
                type="file"
                accept="image/*"
                style={{ marginTop: '10px' }}
                onChange={(e) => handleFileUpload(question.id, e.target.files[0])}
              />
            ) : (
              // If there is a photo, show the image with an onClick handler
              question.photo && (
                <img
                  src={`${process.env.REACT_APP_API_URL}${question.photo}`}
                  onClick={() => handlePhotoClick(`${process.env.REACT_APP_API_URL}${question.photo}`)}
                  alt="uploaded"
                  width={100}
                  style={{ cursor: 'pointer', marginTop: '10px' }}
                />
              )
            )}


            {showComment[question.id] && status === null && UserRole != 'CompanyAdmin' ? (
              <textarea
                placeholder="Add your comment here..."
                style={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                onChange={(e) => handleComment(question.id, e.target.value)}
              />
            ) :
              question.comment != "" ? (
                <textarea disabled
                  style={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                  value={question.comment}
                // onChange={(e) => console.log(`Comment for question ${question.id}:`, e.target.value)}
                />
              ) : null}
          </div>
        ))}
        {/* Display the modal if a photo is set to show */}
        {photoToShow && (
          <div style={modalStyle} onClick={handleClosePhoto}>
            <img src={photoToShow} alt="Question photo" style={photoStyle} />
          </div>
        )}
      </div>
      {status == null && UserRole != 'CompanyAdmin' ?
        <footer>
          <button onClick={SaveTemplate}>
            Submit
          </button>


        </footer> : ""}

      {/*  */}
    </>
  );
};

export default AuditTemplateView;
