import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './Login.css';
import axiosInstance from '../../utils/api';

const Login = () => {
    const [userType, setUserType] = useState('student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('userType', userType);
            formData.append('username', username);
            formData.append('password', password);
    
            const response = await axiosInstance.post('/auth/signup', formData);
    
            console.log('User registered successfully:', response.data);
            setUsername('');
            setPassword('');
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
        <div className="login-container">
            <Navbar />
            <div className="content-login">
                <div className="login-form-box">
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
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
