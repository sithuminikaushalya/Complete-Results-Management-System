import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './LecturerDashboard.css';

const LecturerDashboard = () => {
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [students, setStudents] = useState([]);
    const [showAddStudentForm, setShowAddStudentForm] = useState(false);
    const [newStudentData, setNewStudentData] = useState({
        registrationNumber: '',
        name: '',
        modules: []
    });

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
        setSemester('');
        setStudents([]);
    };

    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
        setStudents([]);
    };

    const getModulesForSemester = (selectedSemester) => {
        let modules = [];

        switch (selectedSemester) {
            case '1':
                modules = ['CE1101', 'CE1202', 'EE1101', 'EE1302', 'ME1201', 'ME1202', 'IS1301', 'IS1402'];
                break;
            case '2':
                modules = ['CE2201', 'CE2302', 'EE2201', 'EE2202', 'ME2201', 'ME2302', 'IS2401'];
                break;
            // Add cases for other semesters if needed
            default:
                break;
        }

        return modules;
    };

    const calculateGPA = (moduleResults) => {
        const gradeValueMap = {
            'A': 4.0, 'A-': 3.7, 'A+': 4.0, 'B': 3.0, 'B-': 2.7, 'B+': 3.3,
            'C': 2.0, 'C-': 1.7, 'C+': 2.3, 'E': 0.0
        };

        const totalModules = moduleResults.length;
        const totalPoints = moduleResults.reduce((acc, result) => acc + (gradeValueMap[result] || 0), 0);
        return totalPoints / totalModules;
    };

    const handleResultChange = (registrationNumber, moduleIndex, newValue) => {
        const updatedStudents = students.map(student => {
            if (student.registrationNumber === registrationNumber) {
                const updatedModules = [...student.modules];
                updatedModules[moduleIndex] = { ...updatedModules[moduleIndex], result: newValue };
                const gpa = calculateGPA(updatedModules.map(module => module.result));
                return { ...student, modules: updatedModules, gpa, sgpa: gpa };
            }
            return student;
        });
        setStudents(updatedStudents);
    };

    const handleDeleteStudent = (registrationNumber) => {
        const updatedStudents = students.filter(student => student.registrationNumber !== registrationNumber);
        setStudents(updatedStudents);
    };

    const handleAddStudent = () => {
        setShowAddStudentForm(true);
    };

    const handleCloseForm = () => {
        setShowAddStudentForm(false);
    };

    const handleSubmitForm = () => {
        const newStudent = {
            ...newStudentData,
            modules: getModulesForSemester(semester).map(moduleName => ({ name: moduleName, result: '' })),
            gpa: 0,
            sgpa: 0
        };
        setStudents([...students, newStudent]);
        setShowAddStudentForm(false);
        setNewStudentData({
            registrationNumber: '',
            name: '',
            modules: []
        });
    };

    const handleStudentInfoChange = (key, value) => {
        setNewStudentData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const handleUpdateStudent = (registrationNumber) => {
        console.log(`Update student with registration number ${registrationNumber}`);
    };

    const handleModuleChange = (e) => {
        const { value } = e.target;
        const updatedModules = newStudentData.modules.map(module => ({ ...module, result: value }));
        setNewStudentData(prevData => ({
            ...prevData,
            modules: updatedModules
        }));
    };
    

    return (
        <div className="dashboard-container-lec">
            <Navbar />
            <div className="dashboard-content-lec">
                <h2>Lecturer Dashboard</h2>
                <div className="select-container-lec">
                    <label htmlFor="departmentSelect">Select Department:</label>
                    <select id="departmentSelect" value={department} onChange={handleDepartmentChange}>
                        <option value="">Select Department</option>
                        <option value="Marine">Marine</option>
                        <option value="Civil">Civil</option>
                        <option value="Computer">Computer</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Mechanical">Mechanical</option>
                    </select>

                    <label htmlFor="semesterSelect">Select Semester:</label>
                    <select id="semesterSelect" value={semester} onChange={handleSemesterChange}>
                        <option value="">Select Semester</option>
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                        <option value="3">Semester 3</option>
                        <option value="4">Semester 4</option>
                        <option value="5">Semester 5</option>
                        <option value="6">Semester 6</option>
                    </select>
                </div>

                {department && semester && (
                    <>
                        <button className="add-student-button-lec" onClick={handleAddStudent}>Add New Student</button>
                        <div className="student-table-container-lec">
                            <h3 className="student-table-title-lec">Department: {department} - Semester: {semester}</h3>
                            <div className="table-wrapper-lec">
                                <table className="student-table-lec">
                                    <thead>
                                        <tr>
                                            <th>Registration Number</th>
                                            <th>Student Name</th>
                                            {students.length > 0 && students[0].modules.map((module, index) => (
                                                <th key={index}>Module {index + 1} - {module.name}</th>
                                            ))}
                                            <th>GPA</th>
                                            <th>SGPA</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, studentIndex) => (
                                            <tr key={student.registrationNumber || studentIndex}>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={student.registrationNumber}
                                                        readOnly
                                                        className="input-field-lec"
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={student.name}
                                                        readOnly
                                                        className="input-field-lec"
                                                    />
                                                </td>
                                                {student.modules.map((module, index) => (
                                                    <td key={index}>
                                                        <select
                                                            value={module.result}
                                                            onChange={(e) => handleResultChange(student.registrationNumber, index, e.target.value)}
                                                            className="select-grade-lec"
                                                        >
                                                            <option value="">Select Grade</option>
                                                            <option value="A">A (4.0)</option>
                                                            <option value="A-">A- (3.7)</option>
                                                            <option value="A+">A+ (4.0)</option>
                                                            <option value="B">B (3.0)</option>
                                                            <option value="B-">B- (2.7)</option>
                                                            <option value="B+">B+ (3.3)</option>
                                                            <option value="C">C (2.0)</option>
                                                            <option value="C-">C- (1.7)</option>
                                                            <option value="C+">C+ (2.3)</option>
                                                            <option value="E">E (0.0)</option>
                                                        </select>
                                                    </td>
                                                ))}


                                                <td>{student.gpa.toFixed(2)}</td>
                                                <td>{student.sgpa.toFixed(2)}</td>
                                                <td>
                                                    <button className="update-button-lec"
                                                        onClick={() => handleUpdateStudent(student.registrationNumber)}
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="delete-button-lec"
                                                        onClick={() => handleDeleteStudent(student.registrationNumber)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {showAddStudentForm && (
                    <div className="popup-form-container">
                        <div className="popup-form">
                            <h3>Add New Student</h3>
                            <label htmlFor="regNumber">Registration Number:</label>
                            <input
                                type="text"
                                id="regNumber"
                                value={newStudentData.registrationNumber}
                                onChange={(e) => handleStudentInfoChange('registrationNumber', e.target.value)}
                            />
                            <label htmlFor="studentName">Student Name:</label>
                            <input
                                type="text"
                                id="studentName"
                                value={newStudentData.name}
                                onChange={(e) => handleStudentInfoChange('name', e.target.value)}
                            />
                            {/* Module selection */}
                            <label htmlFor="moduleSelect">Select Modules:</label>
                            <select
                                id="moduleSelect"
                                value={newStudentData.modules.map(module => module.result)}
                                onChange={(e) => handleModuleChange(e)}
                                className="select-grade-lec"
                            >
                                <option value="">Select Grade</option>
                                <option value="A">A (4.0)</option>
                                <option value="A-">A- (3.7)</option>
                                <option value="A+">A+ (4.0)</option>
                                <option value="B">B (3.0)</option>
                                <option value="B-">B- (2.7)</option>
                                <option value="B+">B+ (3.3)</option>
                                <option value="C">C (2.0)</option>
                                <option value="C-">C- (1.7)</option>
                                <option value="C+">C+ (2.3)</option>
                                <option value="E">E (0.0)</option>
                            </select>
                            <div className="popup-form-buttons">
                                <button onClick={handleCloseForm}>Cancel</button>
                                <button onClick={handleSubmitForm}>Submit</button>
                            </div>
                        </div>
                    </div>

                )}
            </div>
            <Footer />
        </div>
    );

};

export default LecturerDashboard;
