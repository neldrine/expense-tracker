import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css'
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';

import { useContext } from 'react';

function App() {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/login" element={<Login />} />
              </Routes>
          </Router>
      </AuthProvider>
  )
}

export default App
