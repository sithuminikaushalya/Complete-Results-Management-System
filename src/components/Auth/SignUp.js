import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './SignUp.css';
import axiosInstance from '../../utils/api';

const SignUp = () => {
    const [userType, setUserType] = useState('student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [batch, setBatch] = useState('');
    const [department, setDepartment] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [idPhoto, setIdPhoto] = useState(null);
    const [error, setError] = useState('');

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegistrationNumberChange = (e) => {
        setRegistrationNumber(e.target.value);
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleBatchChange = (e) => {
        setBatch(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    const handleIdPhotoChange = (e) => {
        const file = e.target.files[0];
        setIdPhoto(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!username || !password || !registrationNumber || !fullName) {
            setError('Please fill out all required fields.');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('userType', userType);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('registrationNumber', registrationNumber);
            formData.append('fullName', fullName);
            formData.append('batch', batch);
            formData.append('department', department);
            formData.append('profileImage', profileImage);
            formData.append('idPhoto', idPhoto);
    
            const response = await axiosInstance.post('/auth/signup', formData);
    
            console.log('User registered successfully:', response.data);

            // Reset form fields and state after successful registration
            setUsername('');
            setPassword('');
            setRegistrationNumber('');
            setFullName('');
            setBatch('');
            setDepartment('');
            setProfileImage(null);
            setIdPhoto(null);
            setError('');
        } catch (error) {
            console.error('Error registering user:', error);
    
            if (error.response && error.response.data) {
                setError('Failed to register user. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };
    

    return (
        <div className="signup-container">
            <Navbar />
            <div className="content-signup">
                <div className="signup-form-box">
                    <h2>Faculty Of Engineering - Results Management System</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="userType">User Type:</label>
                        <select id="userType" name="userType" value={userType} onChange={handleUserTypeChange}>
                            <option value="student">Student</option>
                            <option value="lecturer">Lecturer</option>
                        </select>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
                        <label htmlFor="registrationNumber">Registration Number:</label>
                        <input type="text" id="registrationNumber" name="registrationNumber" value={registrationNumber} onChange={handleRegistrationNumberChange} />
                        <label htmlFor="fullName">Full Name:</label>
                        <input type="text" id="fullName" name="fullName" value={fullName} onChange={handleFullNameChange} />
                        {userType === 'student' && (
                            <>
                                <label htmlFor="batch">Batch:</label>
                                <select id="batch" name="batch" value={batch} onChange={handleBatchChange}>
                                    <option value="">Select Batch</option>
                                    <option value="21 batch">21 batch</option>
                                    <option value="22 batch">22 batch</option>
                                    <option value="23 batch">23 batch</option>
                                    <option value="24 batch">24 batch</option>
                                    <option value="Graduate">Graduate</option>
                                </select>
                            </>
                        )}
                        {userType === 'lecturer' && (
                            <>
                                <label htmlFor="department">Department:</label>
                                <input type="text" id="department" name="department" value={department} onChange={handleDepartmentChange} />
                            </>
                        )}
                        <label htmlFor="profileImage">Profile Image:</label>
                        <input type="file" id="profileImage" name="profileImage" onChange={handleProfileImageChange} />
                        <label htmlFor="idPhoto">ID Photo:</label>
                        <input type="file" id="idPhoto" name="idPhoto" onChange={handleIdPhotoChange} />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;
