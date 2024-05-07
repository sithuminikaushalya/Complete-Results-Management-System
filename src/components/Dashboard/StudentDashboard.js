import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const StudentDashboard = () => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
                <h2>Student Dashboard</h2>
                {/* Add specific content for student dashboard here */}
                <p>Welcome to the student dashboard! You can view your courses, assignments, grades, and other resources here.</p>
            </div>
            <Footer />
        </div>
    );
};

export default StudentDashboard;
