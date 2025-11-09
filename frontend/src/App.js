import React, { useState, useEffect } from 'react';
// We use BrowserRouter to manage history, and Routes/Route for defining paths.
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Import all three main components
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import LogForm from './components/LogForm';

import './index.css'; 

// --- Main Application Content Component (Renders Dashboard or LogForm) ---
const AppContent = ({ onLogout, userId }) => { 
    // State to toggle between Dashboard and LogForm views
    const [currentView, setCurrentView] = useState('dashboard'); 
    
    // Handlers for view switching
    const handleLogClick = () => {
        setCurrentView('log');
    };

    const handleLogComplete = () => {
        setCurrentView('dashboard');
        // FUTURE: Need to trigger a full dashboard data refresh here
    };

    const handleBackClick = () => {
        setCurrentView('dashboard');
    };

    // Main render logic switches between the two private screens
    if (currentView === 'log') {
        // Pass the necessary user ID for saving the reading
        return <LogForm onLogComplete={handleLogComplete} onBackClick={handleBackClick} userId={userId} />;
    }

    // Default view is Dashboard
    return <Dashboard onLogClick={handleLogClick} onLogout={onLogout} userId={userId} />;
};

// --- Top-Level App Component (Manages Authentication State and Routing) ---
function App() {
    // isLoggedIn tracks auth status based on local storage token
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // userId is needed to link readings to the user
    const [userId, setUserId] = useState(null); 
    const navigate = useNavigate();
    
    // 1. Check for Token on Initial Load
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setIsLoggedIn(true);
            setUserId(user._id); // Capture the user ID
        }
    }, []);

    // 2. Auth Handlers
    const handleAuthSuccess = (userData) => {
        // Called by AuthForm on successful login/sign-up
        setIsLoggedIn(true);
        setUserId(userData._id);
        navigate('/app'); 
    };

    const handleLogout = () => {
        // Called by Dashboard when the user clicks logout
        localStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setUserId(null);
        navigate('/'); // Redirect to login on logout
    };
    
    return (
        <div className="App">
            <Routes>
                {/* Route 1: Login/Sign-up. If logged in, redirect to /app */}
                <Route 
                    path="/" 
                    element={
                        isLoggedIn ? 
                        <Navigate to="/app" /> : 
                        <AuthForm onAuthSuccess={handleAuthSuccess} />
                    } 
                />

                {/* Route 2: Main App Content. If NOT logged in, redirect to / */}
                <Route 
                    path="/app" 
                    element={
                        isLoggedIn ? 
                        <AppContent onLogout={handleLogout} userId={userId} /> : 
                        <Navigate to="/" />
                    } 
                />

                {/* Redirect any other path to the appropriate route */}
                <Route path="*" element={isLoggedIn ? <Navigate to="/app" /> : <Navigate to="/" />} />
            </Routes>
        </div>
    );
}

// Wrapping the component with Router is required for useNavigate to work in App()
const RootApp = () => (
    <Router>
        <App />
    </Router>
);

export default RootApp;