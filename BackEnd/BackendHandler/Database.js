const sql = require('mssql');
const { config } = require('./CommonHandler');

// const config = {
//     user: 'sa',
//     password: 'Admin123',
//     server: 'DESKTOP-2K5KQNV', // your server
//     database: 'AuditTesting_DB',
//     options: {
//         encrypt: true, // Use encryption (depending on your SQL Server configuration)
//         trustServerCertificate: true // Change this based on your server's SSL configuration
//     }
// };

exports.insertRegistration = async (details)  =>{
    try {
        // Connect to the database
        let pool = await sql.connect(config);
        
        // Call the stored procedure
        const result = await pool.request()
            .input('CompanyName', sql.VarChar(50), details.companyName)
            .input('PrimaryUserName', sql.VarChar(50), details.primaryUserName)
            .input('CompanyEmail', sql.VarChar(100), details.companyEmail)
            .input('PhoneNumber', sql.VarChar(15), details.phoneNumber)
            .execute('InsertRegistration');
        
        return result;
    } catch (err) {
        console.error('SQL error', err);
        return { success: false, message: err.message }
    } 
    // finally {
    //     // Close the connection
    //     await sql.close();
    // }
}
