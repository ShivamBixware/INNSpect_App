const { insertRegistration } = require("./Database")
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { config } = require('./CommonHandler')
const multer = require('multer');
const path = require('path');
const fs = require('fs');



exports.loginHandler = async (req, res) => {
    console.log("Received request:", req.body); // Log the incoming request body
    const DBResponse = await insertRegistration(req.body)
    // const { username, password } = req.body; // Retrieve data from body

    if (DBResponse) {
        const JSTCreation = generateToken(req.body)
        const password = await registerUser(req.body.companyEmail)

        let pool = await sql.connect(config);

        const request = await pool.request()


        request.input('password', sql.NVarChar, password);
        request.input('CompanyEmail', sql.VarChar, req.body.companyEmail);


        const result = await request.execute(`UpdateCompanylogin`);

        res.send('Login successful!');
    } else {
        res.status(401).send('Invalid credentials');
    }
};

exports.SaveCompanyDetails = async (req, res) => {
    console.log("Received request:", req.body); // Log the incoming request body
    const { CompanyName, CompanyAddress, CompanyPhone } = req.body;

    try {
        let pool = await sql.connect(config);

        // Call the stored procedure
        const request = await pool.request()

        request.input('CompanyName', sql.NVarChar, CompanyName);
        request.input('CompanyAddress', sql.NVarChar, CompanyAddress);
        request.input('CompanyPhone', sql.NVarChar, CompanyPhone);

        await request.execute('AddCompany');
        res.status(201).json({ message: 'Company added successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error adding company', error });
    }
};

exports.FetchCompanies = async (req, res) => {
    console.log("Received request:", req.body); // Log the incoming request body
    try {
        let pool = await sql.connect(config);

        const request = await pool.request()
        const result = await request.execute('GetAllCompanies');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching companies', error });
    }
};

exports.EditUpdateCompany = async (req, res) => {
    console.log("Received request put:", req.body); // Log the incoming request body
    const { CompanyID, CompanyName, CompanyAddress, CompanyPhone } = req.body;

    try {
        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('CompanyID', sql.Int, CompanyID);
        request.input('CompanyName', sql.NVarChar, CompanyName);
        request.input('CompanyAddress', sql.NVarChar, CompanyAddress);
        request.input('CompanyPhone', sql.NVarChar, CompanyPhone);

        const result = await request.execute(`UpdateCompany`);

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Company updated successfully' });
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating company', error });
    }
};

// Password generation function
function generatePassword(length = 12) {
    return crypto
        .randomBytes(Math.ceil(length / 2)) // Get random bytes
        .toString('hex') // Convert to hexadecimal format
        .slice(0, length); // Slice the string to the required length
}

// Function to send the registration email
async function sendRegistrationEmail(email, password) {
    // Create a transporter using your email service credentials
    let transporter = nodemailer.createTransport({
        service: 'gmail', // You can use another service like Outlook, Yahoo, etc.
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password'   // Your email password or app password
        }
    });

    // Email content
    let mailOptions = {
        from: 'your-email@gmail.com', // Sender address
        to: email,                    // List of receivers (user email)
        subject: 'Registration Successful', // Subject line
        text: `Welcome! Your registration is successful. Your generated password is: ${password}`, // Plain text body
        html: `<p>Welcome! Your registration is successful.</p><p>Your generated password is: <b>${password}</b></p>` // HTML body
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.log('Error sending email:', error);
    }
}

// Registration function
async function registerUser(email) {
    // Generate a password for the user
    const password = generatePassword();

    // You can save the user and password in your database here

    // Send a registration email with the generated password
    // await sendRegistrationEmail(email, password);

    return password;
}

exports.LoginValidation = async (req, res) => {
    try {
        const { EmailID, password } = req.body;

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('CompanyEmail', sql.VarChar, EmailID);

        const result = await request.execute(`FetchCompanyDetails`);

        if (result.recordsets[0]!=undefined && result.recordsets[0].length == 0 && result.recordsets[1].length == 0) {
            res.send({ message: 'Please provide valid Email Address' });
        }
        else if (result.recordsets[0][0] != undefined && result.recordsets[0][0].Password != password && result.recordsest!=undefined &&    result.recordsest[1][0] != undefined && result.recordsest[1][0].Password != password) {
            res.send({ message: 'Invalid Password Provided' });

        }
        else {
            const userObj = result.recordsets[1][0] != undefined && result.recordsets[1][0].Password == password ? result.recordsets[1][0] : result.recordsets[0][0];

            const JSONToken = generateToken(userObj)

            res.status(200).send({ JSONToken });
        }
    } catch (error) {
        console.log('Error sending email:', error);
    }
}

function generateToken(userData) {
    const SECRET_KEY = 'your_secret_key';
    const token = jwt.sign(userData, SECRET_KEY, { expiresIn: '5m' });
    return token;
}

exports.FetchSuperAdminDashboardRecords = async (req, res) => {
    try {
        const { EmailID } = req.body;

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('MailID', sql.NVarChar, EmailID);

        const result = await request.execute(`FetchPaymentDetails`);


        res.status(200).send({ result });

    } catch (error) {
        console.log('Error sending email:', error);
    }
}

exports.UpdateSuperAdminModUserInfo = async (req, res) => {
    try {
        const UserInfo = req.body.selectedUser;

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('username', sql.NVarChar, UserInfo.username);
        request.input('email', sql.NVarChar, UserInfo.email);
        request.input('status', sql.NVarChar, UserInfo.status);
        request.input('activatedOn', sql.NVarChar, UserInfo.activatedOn);


        const result = await request.execute(`UpdateSuperSdminUserInfo`);


        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'User Updated successfully'});
        } else {
            res.status(200).json({ message: 'Failed to Insert User Details' });
        }

    } catch (error) {
        console.log('Error in UpdateSuperAdminModUserInfo:', error);
    }
}

exports.DeleteUserInfoinDB = async (req, res) => {
    try {

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('Id', sql.Int, req.body.id);

        const result = await request.execute(`SPDeleteUserInfoFromDB`);
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'User Deleted successfully' });
        } else {
            res.status(200).json({ message: 'User not found' });
        }

    } catch (error) {
        console.log('Error in  DeleteUserInfoinDB:', error);
    }
}

exports.SaveTemplateinDB = async (req, res) => {
    try {

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('SelectedTemplate', sql.NVarChar, JSON.stringify(req.body.Questions));
        request.input('TemplateName', sql.NVarChar, req.body.Templatename);
        request.input('templateMaster_ID', sql.Int, req.body.templateMaster_ID);


        const result = await request.execute(`SPSaveTemplateDatainDB`);
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Template Inserted successfully', LastInsertedID: result.recordset[0].LastInsertedID });
        } else {
            res.status(200).json({ message: 'Template Failed to Insert' });
        }

    } catch (error) {
        console.log('Error in  DeleteUserInfoinDB:', error);
    }
}

exports.AssignUserforTemplate = async (req, res) => {
    try {

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('UserId', sql.NVarChar, req.body.data.userId);
        request.input('UserRole', sql.NVarChar, req.body.data.UserRole);
        
        const result = await request.execute(`ValidateAssignedUser`);
        if (result.recordset.length > 0) {
            request.input('TemplateId', sql.Int, req.body.data.templateId);
            request.input('templateMaster_ID', sql.Int, req.body.data.templateMaster_ID);
            request.input('Id', sql.Int, result.recordset[0].id);
            request.input('selectedLocation', sql.NVarChar, req.body.data.selectedLocation);

            const result1 = await request.execute(`SPSaveTemplateAssignedUserDatainDB`);

            if (result1.rowsAffected[0] > 0) {
                res.status(200).json({ message: 'Template Mapping for User Inserted successfully' });
            } else {
                res.status(200).json({ message: 'Failed to map  Template for User' });

            }
        }
        else {
            res.status(200).json({ message: 'Invalid User Provided' });
        }

    } catch (error) {
        console.log('Error in  DeleteUserInfoinDB:', error);
    }
}

exports.FetchTemplateDetails = async (req, res) => {
    try {

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('UserEmailId', sql.NVarChar, req.query.EmailID);
        request.input('userRole', sql.NVarChar, req.query.userRole);

        const result = await request.execute(`SPFetchUserMappedTemplateInfo`);


        if (result.recordset.length > 0) {

            res.status(200).json({ Data: result.recordset });
        } else {
            res.status(200).json({ message: 'No Records Found' });

        }


    } catch (error) {
        console.log('Error in  DeleteUserInfoinDB:', error);
    }
}

exports.FetchTemplateSpecificData = async (req, res) => {
    try {

        let pool =  await sql.connect(config);

        const request = await pool.request()
        request.input('TemplateID', sql.NVarChar, req.query.TemplateID);
        request.input('MailID', sql.NVarChar, req.query.MailID);
        request.input('UserRole', sql.NVarChar, req.query.UserRole);
        request.input('Location', sql.NVarChar, req.query.Location);
        request.input('MasterID', sql.NVarChar, req.query.MasterID);

        const result = await request.execute(`SPFetchUserSpecificTemplateInfo`);


        if (result.recordset.length > 0) {

            res.status(200).json({ Data: result.recordset });
        } else {
            res.status(200).json({ message: 'No Records Found for TemplateID' });

        }


    } catch (error) {
        console.log('Error in  DeleteUserInfoinDB:', error);
    }
}

exports.SaveAuditTemplateInfo = async (req, res) => {
    try {

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('TemplateData', sql.NVarChar, JSON.stringify(req.body.Questions));
        request.input('TemplateID', sql.Int, req.body.TemplateID);

        const result = await request.execute(`SPSaveAuditedTemplateDatainDB`);
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Template Inserted successfully' });
        } else {
            res.status(200).json({ message: 'Template Failed to Insert' });
        }

    } catch (error) {
        console.log('Error in  DeleteUserInfoinDB:', error);
    }
}


exports.UpdatTemplateReview = async (req, res) => {
    try {

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('TemplateData', sql.NVarChar, JSON.stringify(req.body.Questions));
        request.input('TemplateID', sql.Int, req.body.TemplateID);
        request.input('Status', sql.NVarChar, req.body.Status);
        request.input('Comments', sql.NVarChar, req.body.Comment);
        request.input('Location', sql.NVarChar, req.body.Location);




        const result = await request.execute(`SPSaveReviewedTemplateDatainDB`);
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Template Review Inserted successfully' });
        } else {
            res.status(200).json({ message: 'Failed to Insert Template Review' });
        }

    } catch (error) {
        console.log('Error in  DeleteUserInfoinDB:', error);
    }
}

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const clientName = req.query.clientName || "defaultClient";
        const clientDir = path.join(__dirname, '../uploads', clientName);

        // Create client-specific folder if it doesn't exist
        try {
            if (!fs.existsSync(clientDir)) {
                fs.mkdirSync(clientDir, { recursive: true });
            }
            cb(null, clientDir);
        } catch (mkdirError) {
            cb(mkdirError);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Generate a unique filename
    }
});

// Initialize multer with the storage config
const upload = multer({ storage }).single('photo');

exports.handleFileUpload = async (req, res) => {
    try {

        upload(req, res, (err) => {
            if (err) {
                return res.status(500).json({ message: 'File upload failed', error: err.message });
            }
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Build the image URL
            const imageUrl = `uploads/${req.query.clientName}/${req.file.filename}`;
            res.json({ imageUrl });
        });

    } catch (error) {
        console.log('Error in  DeleteUserInfoinDB:', error);
    }
}

exports.getSpecificTemplate = async (req, res) => {
    try {

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('TemplateID', sql.Int, req.query.TemplateID);
        const result = await request.execute(`SPFetchSpecificTemplateDetails`);

        if (result.recordsets.length > 0) {
            res.status(200).json(result.recordsets);
        } else {
            res.status(200).json({ message: 'Failed to fetch template etails DB' });
        } 

    } catch (error) {
        console.log('Error in  getTemplatesFromDB:', error);
    }
}

exports.getTemplatesFromDB = async (req, res) => {
    try {

        let pool = await sql.connect(config);

        const request = await pool.request()
        const result = await request.execute(`SPFetchAllTemplateDetails`);

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(200).json({ message: 'Failed to fetch template from DB' });
        } 

    } catch (error) {
        console.log('Error in  getSpecificTemplate:', error);
    }
}

exports.AddNewUserInfoinDB = async (req, res) => {
    try {
        const UserInfo = req.body.selectedUser;

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('username', sql.NVarChar, UserInfo.username);
        request.input('email', sql.NVarChar, UserInfo.email);
        request.input('status', sql.NVarChar, UserInfo.status);
        request.input('activatedOn', sql.NVarChar, UserInfo.activatedOn);


        const result = await request.execute(`SPInsertSuperSdminNewUserInfo`);

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'User Inserted successfully'});
        } else {
            res.status(200).json({ message: 'Failed to Insert User Details' });
        }


    } catch (error) {
        console.log('Error in UpdateSuperAdminModUserInfo:', error);
    }
}

exports.FetchAllUsersRecordFromDB = async (req, res) => {
    try {

        let pool = await sql.connect(config);

        const request = await pool.request()
        const result = await request.execute(`SPFetchAllUsersDetails`);

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(200).json({ message: 'Failed to fetch template from DB' });
        } 

    } catch (error) {
        console.log('Error in  FetchAllUsersRecordFromDB:', error);
    }
}   

exports.FetchEmailTemplatesFromDB = async (req, res) => {
    try {

        let pool = await sql.connect(config);

        const request = await pool.request();
        request.input('ClientID', sql.Int, req.query.clientID);
        const result = await request.execute(`SPFetchAllMailTemplates`);

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(200).json({ message: 'No Records Found' });
        } 

    } catch (error) {
        console.log('Error in  FetchEmailTemplatesFromDB:', error);
    }
} 

exports.AddNewMailTemplateinDB = async (req, res) => {
    try {
        const emailInfo = req.body.params.EmailDetails;
        let checkStat = req.body.params.currentTemplate == null ? 0 : 1;

        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('emailName', sql.NVarChar, emailInfo.name);   
        request.input('emailSubject', sql.NVarChar, emailInfo.subject);
        request.input('emailContent', sql.NVarChar, emailInfo.body);
        request.input('ClientID', sql.Int, req.body.params.clientID);
        request.input('Bool', sql.Int, checkStat);
        if(checkStat == 1)
        request.input('Id', sql.Int, req.body.params.currentTemplate.Id);



        const result = await request.execute(`SPInsertNewEmailTemplate`);

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Email Template Inserted  successfully'});
        } else {
            res.status(200).json({ message: 'Failed to Insert New Email Template Details' });
        }


    } catch (error) {
        console.log('Error in UpdateSuperAdminModUserInfo:', error);
    }
}

exports.deleteMailTemplateFrommDB = async (req, res) => {
    try {
        let pool = await sql.connect(config);

        const request = await pool.request()
        request.input('Id', sql.Int, req.body.id);

        const result = await request.execute(`SPDeleteMailTemplateFromDB`);
        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: 'Mail Template Deleted successfully' });
        } else {
            res.status(200).json({ message: 'Mail Template not found' });
        }

    } catch (error) {
        console.log('Error in  deleteMailTemplateFrommDB:', error);
    }
}