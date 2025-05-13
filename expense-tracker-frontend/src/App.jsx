import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css'
import { AuthProvider, AuthContext } from './context/AuthContext';

// pages
import Login from './pages/Login';
import ExpensesList from './pages/ExpensesList';


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
                  <Route path="/login" element={<Login />} />
                  <Route path="/expenses" element={<PrivateRoute><ExpensesList /></PrivateRoute>} />
              </Routes>
          </Router>
      </AuthProvider>
  )
}

export default App
