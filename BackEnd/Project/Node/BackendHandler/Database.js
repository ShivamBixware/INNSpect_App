const sql = require('mssql');

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
    } finally {
        // Close the connection
        await sql.close();
    }
}
