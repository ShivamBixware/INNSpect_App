import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"


const TemplateReview = () => {
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
  const [showCommentbox, setShowCommentbox] = useState(false)
  const [textShort, setTextShort] = useState(false)
  const [comment, setComment] = useState("")
  const [mandatoryComment, setMandatoryComment] = useState(false)
  const [approvalReject, setApprovalReject] = useState("")

  const [showPhotoUpload, setShowPhotoUpload] = useState({});
  const [showModal, setShowModal] = useState(false);
  let [submitStatus, setsubmitStatus] = useState("");
  const [currentSubHeadingIndex, setCurrentSubHeadingIndex] = useState(0);
  const [currentSubHeading, setcurrentSubHeading] = useState([]);
  const [status, setstatus] = useState({});

  const [templateID, settemplateID] = useState();
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (comment) => {
    console.log('Submitted Comment:', comment);
    handleCloseModal();
  };


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
    setstatus(location.state.status)
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}ManageAuditTemplate/FetchTemplateData`, {
          params: {
            TemplateID: data,
            MailID: decodedToken.company_email,
            UserRole: decodedToken.UserRole,
            Location:location.state.Location,
            MasterID: location.state.MasterID

          },
        });
        debugger;
        // setQuestions(JSON.parse(response.data.Data[0].Questions));
        const questions = response.data.Data.map(item => ({
          subHeading: item.TemplateName, // Use the actual key for subHeading from response
          questions: JSON.parse(item.Questions) // Parse `Questions` JSON string if needed
        }));
        setQuestions(questions)
        setcurrentSubHeading(questions[currentSubHeadingIndex]);
        settemplateID(response.data.Data[0].Template_ID);


      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchReports();

  }, []);



  const handleNextSet = () => {
    debugger
    if (currentSubHeadingIndex < questions.length - 1) {
      setCurrentSubHeadingIndex(currentSubHeadingIndex + 1);
      setcurrentSubHeading(questions[currentSubHeadingIndex + 1]);

    }
  };

  const handlePrevious = () => {
    if (currentSubHeadingIndex > 0) {
      setCurrentSubHeadingIndex(currentSubHeadingIndex - 1);
      setcurrentSubHeading(questions[currentSubHeadingIndex - 1]);

    }
  };

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

  const SaveTemplate = async () => {

    debugger;
    try {
      const Data = {
        Questions: questions,
        TemplateID: templateID,
        Status: submitStatus,
        Comment: comment,
        Location:location.state.Location

      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}ManageReviewerTemplate/UpdatTemplateReview`, Data);

      if (response.data.message === "Template Inserted successfully") {
        document.getElementById("AssignUserbtn").hidden = false;
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error in SaveTemplate:', error);
    }
  };

  const ConfirmationPopup = async (e) => {
    if (comment == "") {
      Swal.fire({
        title: `Please provide Review comment before ${e}`,
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok"
      })
    }
    else {
      submitStatus = e;
      setsubmitStatus(submitStatus)
      Swal.fire({
        title: `Are you sure? <BR/>  Do you want to ${e}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await SaveTemplate();
        }
      });
    }
  }

  // const showTextArea = () => setshowTextarea(true);

  const textareaValue = (e) => setComment(e.target.value);


  function ReturnError() {
    return <div className="alert alert-danger font-size-12 p-0 mt-1 px-1" role="alert">
      {`Text is too short`}
    </div>
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
      <div style={{ padding: '20px', paddingBottom: "80px" }}>
        <h3 style={{ backgroundColor: '#2d3e50', color: 'white', padding: '10px' }}>{currentSubHeading?.subHeading}</h3>
        {currentSubHeading?.questions?.map((question, index) => (
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
              // onClick={() => handleOptionClick(question.id, "Yes")}
              >
                Yes
              </button>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: question.answer === "No" ? '#dc3545' : '#f0f0f0',
                  color: question.answer === "No" ? '#fff' : '#000'
                }}
              // onClick={() => handleOptionClick(question.id, "No")}
              >
                No
              </button>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: question.answer === "N/A" ? '#ffc107' : '#f0f0f0',
                  color: question.answer === "N/A" ? '#fff' : '#000'
                }}
              // onClick={() => handleOptionClick(question.id, "N/A")}
              >
                N/A
              </button>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              {/* <button style={actionButtonStyle} onClick={() => togglePhotoUpload(question.id)}>📷 Photo</button> */}
              {/* <button style={actionButtonStyle} onClick={() => toggleComment(question.id)}>📝 Comment</button> */}
            </div>

            {(question.photo != null) && (
              <>
                {/* <input
                  type="file"
                  accept="image/*"
                  style={{ marginTop: '10px' }}
                  onChange={(e) => handleFileUpload(question.id, e.target.files[0])}
                /> */}
                {question.photo && <img src={`${process.env.REACT_APP_API_URL}${question.photo}`} width={100} />}</>
            )}

            {question.comment != "" && (
              <textarea disabled
                style={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                value={question.comment}
              // onChange={(e) => console.log(`Comment for question ${question.id}:`, e.target.value)}
              />
            )}
          </div>
        ))}
        {/* { showTextarea && */}
        {UserRole == "Reviewer" ?
          <textarea style={{ width: "100%" }} value={comment} onChange={(e) => textareaValue(e)} placeholder='Enter your Review here...'></textarea>
          : ""}
      </div>
      {UserRole === "Reviewer" && (
        <footer>
          {currentSubHeadingIndex > 0 && (
            <button onClick={handlePrevious}>Previous</button>
          )}
          {currentSubHeadingIndex < questions.length - 1 ? (
            <button onClick={handleNextSet}>Next</button>
          ) : (
            // Only show "Approve" and "Reject" buttons on the last page
            <>
              {status === "InProgress" ?  
              <>
              <button onClick={() => ConfirmationPopup("Approve")}>
                Approve Template
              </button>
              <button onClick={() => ConfirmationPopup("Reject")}>
                Reject Template
              </button>
              </>
              :""
              }
            </>
          )}
        </footer>
      )}




    </>
  );
};

export default TemplateReview;
