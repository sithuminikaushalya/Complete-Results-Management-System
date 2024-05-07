import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './LecturerDashboard.css';

const LecturerDashboard = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft') {
                scrollContainerRef.current.scrollLeft -= 100; 
            } else if (e.key === 'ArrowRight') {
                scrollContainerRef.current.scrollLeft += 100; 
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
                <h2>Lecturer Dashboard</h2>
                
                <div className="scrollable-section" ref={scrollContainerRef}>
                    <div className="module">Module 1</div>
                    <div className="module">Module 2</div>
                    <div className="module">Module 3</div>
                    <div className="module">Module 4</div>
                    <div className="module">Module 5</div>
                    <div className="module">Module 6</div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LecturerDashboard;
