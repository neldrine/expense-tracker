import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { EXPENSE_TRACKER_API_URL } from '../config';
import '../css/ExpensesList.css';
import Header from "../components/header";

export default function ExpensesList() {
    const { logout } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);

    const loadExpenses = async () => {
        const res = await axios.get(`${EXPENSE_TRACKER_API_URL}/expenses`);
        setExpenses(res.data);
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    const formatDate = (isoDate) => {
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="expenses-container">
            <Header />

            <div className="expense-summary">
                <div className="summary-box">
                    <h4>Total Expenses</h4>
                    <p>{expenses.length}</p>
                </div>
                <div className="summary-box">
                    <h4>Total Cost</h4>
                    <p>£{expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2)}</p>
                </div>
            </div>

            <ul className="expenses-list">
                {expenses.map(exp => (
                    <li key={exp.id} className={`expense-item ${exp.category.toLowerCase()}`}>
                        <div className="expense-row">
                            <div className="expense-info">
                                <span className="description">{exp.description}</span>
                                <span className="category">{exp.category}</span>
                            </div>
                            <div className="expense-meta">
                                <span className="amount">£{exp.amount}</span>
                                <span className="date">{formatDate(exp.date)}</span>
                            </div>
                        </div>
                        <div className="expense-delete">
                            <button className="delete" onClick={() => handleDelete(exp.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}