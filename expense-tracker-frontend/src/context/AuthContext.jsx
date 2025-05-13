import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { EXPENSE_TRACKER_API_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }, [token]);

    const login = async (username, password) => {
        const res = await axios.post(`${EXPENSE_TRACKER_API_URL}/auth/login`, { username, password });
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
    };

    const logout = async () => {
        await axios.post(`${EXPENSE_TRACKER_API_URL}/auth/logout`);
        setToken(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};