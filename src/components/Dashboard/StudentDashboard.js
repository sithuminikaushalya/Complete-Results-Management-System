import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [results, setResults] = useState([]);

    const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];

    const departments = ['Marine', 'Electrical', 'Mechanical', 'Civil', 'Computer'];

    const mockResults = [
        {
            registrationNumber: '123456',
            name: 'John Doe',
            modules: ['80', '75', '85', '70', '80', '75', '85', '70', '80', '75'],
            SGPA: '3.5',
            GPA: '3.6'
        },
        {
            registrationNumber: '789012',
            name: 'Jane Smith',
            modules: ['85', '90', '80', '88', '85', '90', '80', '88', '85', '90'],
            SGPA: '3.7',
            GPA: '3.8'
        },
    ];

    const fetchResults = () => {
        const filteredResults = mockResults.filter(result => {
            return result.semester === selectedSemester && result.department === selectedDepartment;
        });
        setResults(filteredResults);
    };

    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleRegistrationNumberChange = (e) => {
        setRegistrationNumber(e.target.value);
    };

    const filterResultsByRegistrationNumber = () => {
        if (registrationNumber.trim() === '') {
            setResults([]);
        } else {
            const filteredResults = mockResults.filter(result => {
                return result.registrationNumber.includes(registrationNumber);
            });
            setResults(filteredResults);
        }
    };

    useEffect(() => {
        // Initialize results with mockResults when component mounts
        fetchResults();
    }, []); // Empty dependency array to run once on mount

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
                <h2>Student Dashboard</h2>

                <div className="filter-box">
                    <div className="filter-section">
                        <label htmlFor="semester">Select Semester:</label>
                        <select id="semester" value={selectedSemester} onChange={handleSemesterChange}>
                            {semesters.map((semester) => (
                                <option key={semester} value={semester}>{semester}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-section">
                        <label htmlFor="department">Select Department:</label>
                        <select id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
                            {departments.map((department) => (
                                <option key={department} value={department}>{department}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-section">
                        <label htmlFor="registrationNumber">Filter by Registration Number:</label>
                        <input
                            type="text"
                            id="registrationNumber"
                            value={registrationNumber}
                            onChange={handleRegistrationNumberChange}
                        />
                        <button onClick={filterResultsByRegistrationNumber}>Apply Filter</button>
                    </div>
                </div>

                <div className="results-table">
                    <h3>Results</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Registration Number</th>
                                <th>Name</th>
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((moduleNumber) => (
                                    <th key={`Module ${moduleNumber}`}>Module {moduleNumber}</th>
                                ))}
                                <th>SGPA</th>
                                <th>GPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.registrationNumber}</td>
                                    <td>{result.name}</td>
                                    {result.modules.map((moduleScore, i) => (
                                        <td key={`Module ${i + 1}`}>{moduleScore}</td>
                                    ))}
                                    <td>{result.SGPA}</td>
                                    <td>{result.GPA}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StudentDashboard;
