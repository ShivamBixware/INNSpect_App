import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCompany = () => {
    const [companyData, setCompanyData] = useState({
        CompanyID:'',
        CompanyName: '',
        CompanyAddress: '',
        CompanyPhone: ''
    });

    const [companies, setCompanies] = useState([]);
    const [editing, setEditing] = useState(false); // Tracks if editing a company
    // const [editCompanyId, setEditCompanyId] = useState(null); // Holds the ID of the company being edited


    // Fetch companies from the backend
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}ManageComapnies/getCompanies`);
                debugger
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies Details:', error.message);
            }
        };

        fetchCompanies();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setCompanyData({
            ...companyData,
            [e.target.name]: e.target.value
        });
    };

    // // Handle form submission to add a new company
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post(`${process.env.REACT_APP_API_URL}ManageComapnies/SaveCompany', companyData);
    //         alert('Company added successfully');
    //         setCompanyData({ CompanyName: '', CompanyAddress: '', CompanyPhone: '' });
    //         // Refresh the company list after adding
    //         const response = await axios.get(`${process.env.REACT_APP_API_URL}ManageComapnies/getCompanies');
    //         setCompanies(response.data);
    //     } catch (error) {
    //         console.error('Error adding company:', error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editing) {
            // Update company if in editing mode
            try {
                await axios.put(`${process.env.REACT_APP_API_URL}ManageComapnies/editCompany`, companyData);
                alert('Company updated successfully');
                setEditing(false);
            } catch (error) {
                console.error('Error updating company:', error);
            }
        } else {
            // Add new company
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}ManageComapnies/SaveCompany`, companyData);
                alert('Company added successfully');
            } catch (error) {
                console.error('Error adding company:', error);
            }
        }

        // Reset form and refresh company list
        setCompanyData({ CompanyName: '', CompanyAddress: '', CompanyPhone: '' });
        const response = await axios.get(`${process.env.REACT_APP_API_URL}ManageComapnies/getCompanies`);
        setCompanies(response.data);
    };
     // Handle editing a company
     const handleEdit = (company) => {
        setEditing(true);
        setCompanyData({
            CompanyID: company.CompanyID,
            CompanyName: company.CompanyName,
            CompanyAddress: company.CompanyAddress,
            CompanyPhone: company.CompanyPhone
        });
    };
    return (
        <div>
            <h2>Manage Companies</h2>

            {/* Add Company Form */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Company Name</label>
                    <input
                        type="text"
                        name="CompanyName"
                        value={companyData.CompanyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Company Address</label>
                    <input
                        type="text"
                        name="CompanyAddress"
                        value={companyData.CompanyAddress}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Company Phone</label>
                    <input
                        type="text"
                        name="CompanyPhone"
                        value={companyData.CompanyPhone}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{editing ? 'Update Company' : 'Add Company'}</button>
            </form>

            {/* Company List */}
            <h3>Existing Companies</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company.CompanyID}>
                            <td>{company.CompanyID}</td>
                            <td>{company.CompanyName}</td>
                            <td>{company.CompanyAddress}</td>
                            <td>{company.CompanyPhone}</td>
                            <td>
                                <button onClick={() => handleEdit(company)} style={{ cursor: 'pointer' }} >Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageCompany;
