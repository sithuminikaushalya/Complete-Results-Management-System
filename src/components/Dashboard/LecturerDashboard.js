import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './LecturerDashboard.css';

const LecturerDashboard = () => {
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [students, setStudents] = useState([]);

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
        setSemester('');
        setStudents([]);
    };

    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
        if (department && semester) {
            const fetchedStudents = [
                { registrationNumber: '001', name: 'John Doe', modules: getModulesForSemester(semester), gpa: 0, sgpa: 0 },
                { registrationNumber: '002', name: 'Jane Smith', modules: getModulesForSemester(semester), gpa: 0, sgpa: 0 },
            ];
            setStudents(fetchedStudents);
        } else {
            setStudents([]);
        }
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
        const totalPoints = moduleResults.reduce((acc, result) => acc + gradeValueMap[result], 0);
        return totalPoints / totalModules;
    };

    const handleResultChange = (registrationNumber, moduleIndex, newValue) => {
        const updatedStudents = students.map(student => {
            if (student.registrationNumber === registrationNumber) {
                const updatedModules = [...student.modules];
                updatedModules[moduleIndex] = newValue;
                const gpa = calculateGPA(updatedModules);
                return { ...student, modules: updatedModules, gpa };
            }
            return student;
        });
        setStudents(updatedStudents);
    };

    const handleSgpaChange = (registrationNumber, newSgpa) => {
        const updatedStudents = students.map(student => {
            if (student.registrationNumber === registrationNumber) {
                return { ...student, sgpa: newSgpa };
            }
            return student;
        });
        setStudents(updatedStudents);
    };

    const handleDeleteStudent = (registrationNumber) => {
        const updatedStudents = students.filter(student => student.registrationNumber !== registrationNumber);
        setStudents(updatedStudents);
    };

    const handleUpdateStudent = (registrationNumber) => {
        console.log(`Update student with registration number ${registrationNumber}`);
    };

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
                <h2>Lecturer Dashboard</h2>
                <div className="select-container">
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

                {students.length > 0 && (
                    <div className="student-table">
                        <h3>Department: {department} - Semester: {semester}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Registration Number</th>
                                    <th>Student Name</th>
                                    {students[0].modules.map((module, index) => (
                                        <th key={index}>Module {index + 1} - {module}</th>
                                    ))}
                                    <th>GPA</th>
                                    <th>SGPA</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.registrationNumber}>
                                        <td>{student.registrationNumber}</td>
                                        <td>{student.name}</td>
                                        {student.modules.map((moduleResult, index) => (
                                            <td key={index}>
                                                <select
                                                    value={moduleResult}
                                                    onChange={(e) => handleResultChange(student.registrationNumber, index, e.target.value)}
                                                >
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
                                        <td>
                                            <input
                                                type="number"
                                                value={student.sgpa}
                                                onChange={(e) => handleSgpaChange(student.registrationNumber, parseFloat(e.target.value))}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => handleUpdateStudent(student.registrationNumber)}>Update</button>
                                            <button onClick={() => handleDeleteStudent(student.registrationNumber)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default LecturerDashboard;
