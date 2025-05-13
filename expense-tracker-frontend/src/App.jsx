import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css'
import { AuthProvider, AuthContext } from './context/AuthContext';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import ExpensesList from './pages/ExpensesList';
import ExpenseCreate from './pages/ExpenseCreate.jsx';

import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/expenses" element={<PrivateRoute><ExpensesList /></PrivateRoute>} />
                  <Route path="/expenses/create" element={<PrivateRoute><ExpenseCreate /></PrivateRoute>} />
              </Routes>
          </Router>
      </AuthProvider>
  )
}

export default App
