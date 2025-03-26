// routes/index.js
const express = require('express');
const router = express.Router();
const logger = require('../Logger');

const { loginHandler, SaveCompanyDetails, FetchCompanies, EditUpdateCompany, LoginValidation,
    UpdateSuperAdminModUserInfo, FetchSuperAdminDashboardRecords, DeleteUserInfoinDB,SaveTemplateinDB,
    AssignUserforTemplate, FetchTemplateDetails , FetchTemplateSpecificData, SaveAuditTemplateInfo,
     UpdatTemplateReview,handleFileUpload,getTemplatesFromDB, getSpecificTemplate, AddNewUserInfoinDB,
     FetchAllUsersRecordFromDB, FetchEmailTemplatesFromDB, AddNewMailTemplateinDB, deleteMailTemplateFrommDB} = require('../BackendHandler/Logichandler');



// Home Page Route
try {
    router.post('/Entry', loginHandler);
    router.post('/SaveCompany', SaveCompanyDetails);
    router.get('/getCompanies', FetchCompanies);
    router.put('/editCompany/', EditUpdateCompany);
    router.post('/LoginValidation', LoginValidation);
    router.post('/FetchSADBRecord', FetchSuperAdminDashboardRecords);
    router.post('/UpdateUserInfo', UpdateSuperAdminModUserInfo);
    router.post('/AddUserInfo', AddNewUserInfoinDB);
    router.post('/DeleteUserInfo', DeleteUserInfoinDB);
    router.post('/SaveTemplate', SaveTemplateinDB);
    router.post('/AssignUser', AssignUserforTemplate);
    router.get('/TemplateDetails', FetchTemplateDetails);
    router.get('/FetchTemplateData', FetchTemplateSpecificData);
    router.post('/SaveAuditTemplate', SaveAuditTemplateInfo);
    router.post('/UpdatTemplateReview', UpdatTemplateReview);
    router.post('/uploadImage', handleFileUpload);
    router.get('/getTemplates', getTemplatesFromDB);
    router.get('/getSpecificTemplate', getSpecificTemplate);
    router.get('/FetchAllUsersRecord', FetchAllUsersRecordFromDB);
    router.get('/FetchEmailTemplates', FetchEmailTemplatesFromDB);
    router.post('/AddNewMailTemplate', AddNewMailTemplateinDB);
    router.post('/deleteMailTemplate', deleteMailTemplateFrommDB);












} catch (error) {
    logger.error(`Error in route: ${error.message}`);
    console.log(error);
}







module.exports = router;
