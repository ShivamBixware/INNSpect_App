import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    primaryUserName: '',
    companyEmail: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({
    companyName: '',
    primaryUserName: '',
    companyEmail: '',
    phoneNumber: '',
    apiError: ''
  });

  // Regex Patterns
  const patterns = {
    companyName: /^[a-zA-Z\s]{2,50}$/,
    primaryUserName: /^[a-zA-Z\s]{2,50}$/,
    companyEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneNumber: /^\+?[1-9]\d{1,14}$/
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'companyName':
        if (!value.trim()) {
          error = 'Company Name is required.';
        } else if (!patterns.companyName.test(value)) {
          error = 'Company Name should contain only letters and spaces (2-50 characters).';
        }
        break;

      case 'primaryUserName':
        if (!value.trim()) {
          error = 'Primary User Name is required.';
        } else if (!patterns.primaryUserName.test(value)) {
          error = 'Primary User Name should contain only letters and spaces (2-50 characters).';
        }
        break;

      case 'companyEmail':
        if (!value.trim()) {
          error = 'Company Email is required.';
        } else if (!patterns.companyEmail.test(value)) {
          error = 'Please enter a valid email address.';
        }
        break;

      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Phone Number is required.';
        } else if (!patterns.phoneNumber.test(value)) {
          error = 'Please enter a valid phone number.';
        }
        break;

      default:
        break;
    }

    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({ ...prevData, [name]: value }));

    // Validate the field on change
    validateField(name, value);
  };

  // Validate all fields before submission
  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach(field => {
      validateField(field, formData[field]);
      if (errors[field]) {
        newErrors[field] = errors[field];
      }
    });

    // Check if there are any errors
    const isValid = Object.values(newErrors).every(error => error === '');

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset API error
    setErrors(prevErrors => ({ ...prevErrors, apiError: '' }));

    // Validate form before submission
    const isValid = validateForm();

    if (!isValid) {
      console.log('Validation failed:', errors);
      return;
    }

    try {
      // Submit logic here
      console.log('Form Data:', formData);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}Registration/Entry`, formData);

      // Handle successful response
      console.log('Registration successful:', response.data);
      // Optionally, reset form
      setFormData({
        companyName: '',
        primaryUserName: '',
        companyEmail: '',
        phoneNumber: ''
      });
      alert('Registration successful!');
      window.location.pathname = '/Login'
    } catch (error) {
      console.error('API Error:', error);
      setErrors(prevErrors => ({
        ...prevErrors,
        apiError: 'An error occurred while submitting the form. Please try again later.'
      }));
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1>Register Your Company</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className={errors.companyName ? 'input-error' : ''}
            />
            {errors.companyName && <span className="error">{errors.companyName}</span>}
          </div>

          <div className="form-group">
            <label>Primary User Name</label>
            <input
              type="text"
              name="primaryUserName"
              value={formData.primaryUserName}
              onChange={handleChange}
              required
              className={errors.primaryUserName ? 'input-error' : ''}
            />
            {errors.primaryUserName && <span className="error">{errors.primaryUserName}</span>}
          </div>

          <div className="form-group">
            <label>Company Email ID</label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              required
              className={errors.companyEmail ? 'input-error' : ''}
            />
            {errors.companyEmail && <span className="error">{errors.companyEmail}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className={errors.phoneNumber ? 'input-error' : ''}
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
          </div>

          {errors.apiError && <div className="error api-error">{errors.apiError}</div>}

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
