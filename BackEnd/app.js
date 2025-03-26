const express =     require('express');
const cors = require('cors'); 
const app = express();
const fs = require('fs');
const https = require('https');
const port = 3001;
const logger = require('./Logger')
const path = require('path');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); 

// Import Routes
const Router = require('./Router/Router');

// Use Routes
app.use('/API/Registration', Router);
app.use('/API/ManageComapnies', Router);
app.use('/API/Login', Router);
app.use('/API/SuperAdminDashboard', Router);
app.use('/API/SuperAdminUserManagement', Router);
app.use('/API/TemplateCreation', Router); 
app.use('/API/ManageAuditTemplate', Router);
app.use('/API/ManageReviewerTemplate', Router);
app.use('/API/EmailTemplate', Router);


app.use('/API/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send('Internal Server Error');
});


app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});

