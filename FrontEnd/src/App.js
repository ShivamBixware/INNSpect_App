
import React, { useEffect, useState } from 'react';
import RegistrationForm from './Components/Registration';
import ManageCompany from './Components/ManageCompany';
import SignInPage from './Components/Login';
import DashboardSuperAdmin from './Components/DashboardSuperAdmin';
import SetUPSuperAdmin from "./Components/SetUp";
import CompanyAdmin from "./Components/CompanyAdmin";
import TemplateSuperAdmin from "./Components/Template";
import SuperAdmin360view from "./Components/360View";
import Usermanagement from "./Components/UserManagement";
import TemplateCreationModule from './Components/TemplateCreation';
import DetailedTemplate from './Components/TemplateQuestion'
import ManageAuditTemplates from './Components/ManageAuditTemplates';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuditTemplateView from './Components/AuditTemplateView'
import TemplateReview from './Components/TemplateReview'
import { jwtDecode } from 'jwt-decode';
import EmailTemplateModule from './Components/EmailTemplate'



function App() {

  let [decodedToken, setDecodedToken] = useState(null);
  const [UserRole, setUserRole] = useState("");
  let [BasePath, setBasePath] = useState("/");


  useEffect(() => {
    const ws = new WebSocket('wss://admin.innspect.app:3001/ws');

    ws.onopen = () => {
      console.log('Connected to the server');
      ws.send('Hello Server!');
    };

    ws.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Disconnected from the server');
    };


    if (window.location.pathname != "/Login") {
      const token = localStorage.getItem('uSeR_IF0');
      if (token) {
        try {
          // Decode the JWT token
          const decoded = jwtDecode(token);
          console.log('Decoded Token:', decoded);

          // Set the decoded token in the component's state
          setDecodedToken(decoded);
          decodedToken = decoded;
          if (decodedToken.UserRole == "SuperAdmin") {
            setBasePath("SuperAdmin/")
          }
          // alert(BasePath)
          // alert(`${BasePath}SetUp`)

        } catch (error) {
          console.error('Error decoding JWT token:', error);
        }
      }
      else {
        alert("Invalid User")
      }
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Registration" element={<RegistrationForm />}></Route>
          <Route path="/ManageCompany" element={<ManageCompany/>}></Route> 
          <Route path="/Login" element={<SignInPage />}></Route>
          <Route path={`SuperAdmin/Dashboard`} element={<DashboardSuperAdmin />}></Route>
          <Route path={"/SetUp"} element={<SetUPSuperAdmin />}></Route>
          <Route path={`${BasePath}SetUp`} element={<SetUPSuperAdmin />}></Route>
          <Route path={`/Dashboard`} element={<CompanyAdmin />}></Route>
          <Route path={`${BasePath}Template`} element={<TemplateSuperAdmin />}></Route>
          <Route path={`${BasePath}360view`} element={<SuperAdmin360view />}></Route>
          <Route path={`${BasePath}usermanagement`} element={<Usermanagement />}></Route>
          <Route path={`/TemplateCreation`} element={<TemplateCreationModule />}></Route>
          <Route path="/TemplateCreation/:name" element={<DetailedTemplate />} />
          <Route path="/ManageTemplates" element={<ManageAuditTemplates />} />
          <Route path="/ManageTemplates/TemplateView" element={<AuditTemplateView />} />
          <Route path="/ManageTemplates/TemplateReview" element={<TemplateReview />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
