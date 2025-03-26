import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Button, TextField, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const DetailedTemplate = () => {
    const [companyData, setCompanyData] = useState({
        CompanyID: '',
        CompanyName: '',
        CompanyAddress: '',
        CompanyPhone: ''
    });

    const [showAssignUsersModal, setshowAssignUsersModal] = useState(true); // Tracks if editing a company
    const [showAssignUsersPanel, setShowAssignUsersPanel] = useState(false);
    const [AssignedUserMailID, setAssignedUserMailID] = useState("");
    const [AssignedReviewerMailID, setAssignedReviewerMailID] = useState("");
    const [currentSubHeadingIndex, setCurrentSubHeadingIndex] = useState(0);
    const [currentSubHeading, setcurrentSubHeading] = useState([]);

    const [buttonVisible, setButtonVisible] = useState(false);
    // const [editCompanyId, setEditCompanyId] = useState(null); // Holds the ID of the company being edited
    const [UserRole, setUserRole] = useState("");
    let [decodedToken, setDecodedToken] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [TemplateMainHeading, setTemplateMainHeading] = useState([]);

    const [category, setCategory] = useState([]);
    const [selectedLocation, setselectedLocation] = useState("");

    const navigate = useNavigate();

    const location = useLocation();
    const data = location.state.templateId; // Accessing the passed state
    // Fetch Templates from the backend
    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}TemplateCreation/getSpecificTemplate`, {
                    params: {
                        TemplateID: data
                    },
                });
                debugger
                const questionData = JSON.parse(response.data[0][0].TemplateQuestions);
                setQuestions(questionData);
                setTemplateMainHeading(response.data[0][0].TemplateName)
                setcurrentSubHeading(questionData[currentSubHeadingIndex]);
                setCategory(response.data[1])

            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchTemplates();
    }, []);

    const [editMode, setEditMode] = useState(false);
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

    }, [showAssignUsersModal]);

    // const questions = [
    //     { id: 1, text: "Food premises registration document available & signed" },
    //     { id: 2, text: "Food policy statements in place" },
    //     { id: 3, text: "Policy documentation available, signed & dated" },
    //     { id: 4, text: "Documentation brought to the attention of staff" },
    //     // Add more questions as needed
    // ];

    // const [questions, setQuestions] = useState([
    //     { id: 1, text: "Food premises registration document available & signed", answer: "", comment: "", photo: null },
    //     { id: 2, text: "Food policy statements in place", answer: "", comment: "", photo: null },
    //     { id: 3, text: "Policy documentation available, signed & dated", answer: "", comment: "", photo: null },
    //     { id: 4, text: "Documentation brought to the attention of staff", answer: "", comment: "", photo: null }
    // ]);

    // const [questions, setQuestions] = useState([
    // {
    //     subHeading: "Food Safety",
    //     questions: [
    //         { id: 1, text: "Food premises registration document available & signed", answer: "", comment: "", photo: null },
    //         { id: 2, text: "Food policy statements in place", answer: "", comment: "", photo: null },
    //         { id: 3, text: "Policy documentation available, signed & dated", answer: "", comment: "", photo: null },
    //         { id: 4, text: "Documentation brought to the attention of staff", answer: "", comment: "", photo: null },
    //         { id: 5, text: "Compliance with hygiene practices", answer: "", comment: "", photo: null }
    //     ]
    // },
    // {
    //     subHeading: "Health & Safety",
    //     questions: [
    //         { id: 1, text: "First-aid kits available and accessible", answer: "", comment: "", photo: null },
    //         { id: 2, text: "Safety policy document signed and visible", answer: "", comment: "", photo: null },
    //         { id: 3, text: "Fire evacuation procedures known", answer: "", comment: "", photo: null },
    //         { id: 4, text: "Regular health and safety checks conducted", answer: "", comment: "", photo: null },
    //         { id: 5, text: "Staff trained on safety procedures", answer: "", comment: "", photo: null }
    //     ]
    // },
    // {
    //     subHeading: "Environmental Standards",
    //     questions: [
    //         { id: 1, text: "Waste disposal protocols in place", answer: "", comment: "", photo: null },
    //         { id: 2, text: "Recycling facilities available", answer: "", comment: "", photo: null },
    //         { id: 3, text: "Compliance with environmental policies", answer: "", comment: "", photo: null },
    //         { id: 4, text: "Staff trained on environmental practices", answer: "", comment: "", photo: null },
    //         { id: 5, text: "Energy-saving measures implemented", answer: "", comment: "", photo: null }
    //     ]
    // },
    // {
    //     subHeading: "Equipment & Maintenance",
    //     questions: [
    //         { id: 1, text: "Regular maintenance checks performed", answer: "", comment: "", photo: null },
    //         { id: 2, text: "Faulty equipment promptly reported", answer: "", comment: "", photo: null },
    //         { id: 3, text: "Equipment logs up-to-date", answer: "", comment: "", photo: null },
    //         { id: 4, text: "Proper storage of tools and equipment", answer: "", comment: "", photo: null },
    //         { id: 5, text: "Routine calibration of equipment", answer: "", comment: "", photo: null }
    //     ]
    // },
    // {
    //     subHeading: "Staff Training & Competence",
    //     questions: [
    //         { id: 1, text: "All staff trained on latest procedures", answer: "", comment: "", photo: null },
    //         { id: 2, text: "Certification records maintained", answer: "", comment: "", photo: null },
    //         { id: 3, text: "Ongoing training programs available", answer: "", comment: "", photo: null },
    //         { id: 4, text: "Staff evaluations conducted regularly", answer: "", comment: "", photo: null },
    //         { id: 5, text: "New staff onboarding completed", answer: "", comment: "", photo: null }
    //     ]
    // }
    // ]);

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

    // const { name } = useParams();
    const templateQuestions = questions;

    // State to manage temporary colors on button clicks
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showComment, setShowComment] = useState({});
    const [showPhotoUpload, setShowPhotoUpload] = useState({});
    const [templateID, settemplateID] = useState();
    const [templateMaster_ID, settemplateMaster_ID] = useState(1);



    // Handle option click with temporary color change
    const handleOptionClick = (questionId, option) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: option,
        }));
    };

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
        try {
            const Data = {
                Questions: currentSubHeading.questions,
                Templatename: currentSubHeading.subHeading,
                templateMaster_ID: templateMaster_ID

            }
            debugger
            const response = await axios.post(`${process.env.REACT_APP_API_URL}TemplateCreation/SaveTemplate`, Data);
            debugger
            if (response.data.message == "Template Inserted successfully") {
                // document.getElementById("AssignUserbtn").hidden = false;
                settemplateID(response.data.LastInsertedID)
                alert(response.data.message)
                EnableAssignUsersPanel();
                // assignUsersToTemplate();

            }
            else {
                alert(response.data.message)
            }
        } catch (error) {
            console.error('Error in SaveTemplate:', error);
        }
    }
    const assignUsersToTemplate = async (UserRole) => {
        try {
            debugger
            const response = await axios.post(`${process.env.REACT_APP_API_URL}TemplateCreation/AssignUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: { templateId: templateID, templateMaster_ID: templateMaster_ID, userId: UserRole == "Reviewer" ? AssignedUserMailID : AssignedReviewerMailID, UserRole: UserRole, selectedLocation: selectedLocation }
            });
            setshowAssignUsersModal(false);
            if (response.data.message == "Invalid User Provided") {
                alert(response.data.message)
            }
            else if (response.data.message == "Failed to map  Template for User") {
                alert(response.data.message)
            }
            else {
                alert(response.data.message)
            }
        }
        catch (error) {
        }
    };
    const EnableAssignUsersPopup = () => {
        setshowAssignUsersModal(true);
        console.log("Modal should now be set to true:", showAssignUsersModal);
    };

    const handleAddQuestion = () => {
        const newId = questions.length > 0 ? questions[questions.length - 1].id + 1 : 1;
        setQuestions([
            ...questions,
            { id: newId, text: "", answer: "", comment: "", photo: null }
        ]);
    };

    // Function to handle text change for a specific field in questions
    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = questions.map((question, i) =>
            i === index ? { ...question, [field]: value } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleUserMailIDChange = (e) => {
        try {
            setAssignedUserMailID(e.target.value)
        } catch (error) {

        }
    }

    const handleUserMailIDChangeforReviewer = (e) => {
        try {
            setAssignedReviewerMailID(e.target.value)
        } catch (error) {

        }
    }

    const handleNextSet = () => {
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

    const EnableAssignUsersPanel = () => {
        console.log("Assign User button clicked");
        setShowAssignUsersPanel(true);
    };

    const onchangeTemplatqQuestion = (questionId, newText) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(question =>
                question.id === questionId ? { ...question, text: newText } : question
            )
        );
    };

    return (
        <>
        <div style={{
                    alignItems: "center",
                    padding: "10px 20px",
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}>
                    <a
                        href='/TemplateCreation'
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
                
                <h2>Template Name: {TemplateMainHeading}</h2>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <button style={{ color: 'green' }}>Preview</button>
                </div>

                <div>
                    <h3 style={{ backgroundColor: '#2d3e50', color: 'white', padding: '10px' }}>{currentSubHeading?.subHeading}</h3>

                    {currentSubHeading?.questions?.map((question, index) => (
                        <>
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
                                {editMode ?
                                    // <input>{index + 1}. {question.text}</input>
                                    // <input type="text" name={question.text} value={index + 1 + ". " + question.text} onChange={()=>onchangeTemplatqQuestion(question.id)} placeholder="" />
                                    <input
                                        type="text"
                                        value={question.text}
                                        onChange={(e) => onchangeTemplatqQuestion(question.id, e.target.value)}
                                        placeholder="Edit question text"
                                    />
                                    :

                                    <h4>{index + 1}. {question.text}</h4>}
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button
                                        style={{
                                            ...buttonStyle,
                                            backgroundColor: selectedOptions[question.id] === "Yes" ? '#28a745' : '#f0f0f0',
                                            color: selectedOptions[question.id] === "Yes" ? '#fff' : '#000'
                                        }}
                                        onClick={() => handleOptionClick(question.id, "Yes")}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        style={{
                                            ...buttonStyle,
                                            backgroundColor: selectedOptions[question.id] === "No" ? '#dc3545' : '#f0f0f0',
                                            color: selectedOptions[question.id] === "No" ? '#fff' : '#000'
                                        }}
                                        onClick={() => handleOptionClick(question.id, "No")}
                                    >
                                        No
                                    </button>
                                    <button
                                        style={{
                                            ...buttonStyle,
                                            backgroundColor: selectedOptions[question.id] === "N/A" ? '#ffc107' : '#f0f0f0',
                                            color: selectedOptions[question.id] === "N/A" ? '#fff' : '#000'
                                        }}
                                        onClick={() => handleOptionClick(question.id, "N/A")}
                                    >
                                        N/A
                                    </button>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button style={actionButtonStyle} onClick={() => togglePhotoUpload(question.id)}>📷 Photo</button>
                                    <button style={actionButtonStyle} onClick={() => toggleComment(question.id)}>📝 Comment</button>
                                </div>

                                {showPhotoUpload[question.id] && (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ marginTop: '10px' }}
                                        onChange={(e) => console.log(`Image selected for question ${question.id}:`, e.target.files[0])}
                                    />
                                )}

                                {showComment[question.id] && (
                                    <textarea
                                        placeholder="Add your comment here..."
                                        style={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                        onChange={(e) => console.log(`Comment for question ${question.id}:`, e.target.value)}
                                    />
                                )}
                            </div>
                        </>
                    ))}
                    {editMode ?
                        <div style={{ display: "flex", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }}>
                            <IconButton color="primary" style={{ justifyContent: "center" }} onClick={handleAddQuestion} aria-label="add question">
                                <AddIcon />
                            </IconButton>
                        </div>
                        : ""}
                </div>



            </div>

            <footer>
                <button onClick={SaveTemplate}>
                    Assign & Save Template
                </button>
                <button onClick={() => setEditMode(true)}>
                    Edit Template
                </button>
                {/* // Add this after the Save button */}
                {/* <button  id='AssignUserbtn' onClick={EnableAssignUsersPopup}>Assign User</button> */}
                {/* {buttonVisible && ( */}
                {/* <button hidden id='AssignUserbtn' onClick={EnableAssignUsersPanel}>
                    Assign User
                </button> */}
                {currentSubHeadingIndex > 0 && (
                    <button onClick={handlePrevious}>Previous</button>
                )}
                {questions && currentSubHeadingIndex < questions.length - 1 && (
                    <button onClick={handleNextSet}>Next</button>
                )}
                {/* )} */}
                {/* Assign Users Modal */}


            </footer>
            {/* Slide-in Panel */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: showAssignUsersPanel ? 0 : '-100%',
                width: '300px',
                height: '100%',
                backgroundColor: 'white',
                transition: 'right 0.3s ease',
                zIndex: 1000,
                padding: '20px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            }}>
                <h5>Assign Audit User to Template</h5>
                <input
                    type="text"
                    value={AssignedUserMailID}
                    placeholder="Enter User MailID"
                    onChange={handleUserMailIDChange}
                />
                <button style={{ margin: "10px" }} onClick={() => assignUsersToTemplate("Reviewer")}>Assign</button>

                <h4>Assign Review User to Template</h4>
                <input
                    type="text"
                    value={AssignedReviewerMailID}
                    placeholder="Enter User MailID"
                    onChange={handleUserMailIDChangeforReviewer}
                    style={{ margin: "10px" }}
                />

                <h4>Assign Review User Location to Template</h4>
                {/* <input
                    type="text"
                    value={AssignedReviewerMailID}
                    placeholder="Enter User MailID"
                    onChange={handleUserMailIDChangeforReviewer}
                /> */}
                <select
                    value={selectedLocation}
                    onChange={(e) => setselectedLocation(e.target.value)}
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        marginBottom: '10px',
                        minWidth: '150px',
                        width: '100%',
                    }}
                >
                    {category.map((cat, index) => (
                        <option key={index} value={cat.CompanyLocations}>{cat.CompanyLocations}</option>
                    ))}
                </select>
                <button style={{ margin: "10px" }} onClick={() => assignUsersToTemplate("Auditor")}>Assign</button>

                <button style={{ float: "right", margin: "10px" }} onClick={() => setShowAssignUsersPanel(false)}>Close</button>
            </div>
            {/* Overlay for panel */}
            {showAssignUsersPanel && (
                <div onClick={() => setShowAssignUsersPanel(false)} style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999,
                }}></div>
            )}





        </>
    );
};


export default DetailedTemplate;