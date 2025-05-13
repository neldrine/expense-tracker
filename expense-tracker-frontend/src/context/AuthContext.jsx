import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { EXPENSE_TRACKER_API_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

    useEffect(() => {
        if (token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }, [token]);

    const login = async (name, password) => {
        const res = await axios.post(`${EXPENSE_TRACKER_API_URL}/auth/login`, { name, password });
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
    };

    const logout = async () => {
        await axios.post(`${EXPENSE_TRACKER_API_URL}/auth/logout`);
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};