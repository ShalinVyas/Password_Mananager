import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Login from './components/Login';
import Generator from './components/Generator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (credentials) => {
    if (credentials.username === "admin" && credentials.password === "admin") {
      setIsAuthenticated(true);
      return true;
    }
    alert("Invalid credentials! Please try again.");
    return false;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/manager" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/manager" 
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Manager />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/generator" 
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Generator />
              </>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
