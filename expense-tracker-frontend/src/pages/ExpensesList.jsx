import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { EXPENSE_TRACKER_API_URL } from '../config';
import '../css/ExpensesList.css';
import Header from "../components/header";

export default function ExpensesList() {
    const [expenses, setExpenses] = useState([]);

    const loadExpenses = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get(`${EXPENSE_TRACKER_API_URL}/expenses`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setExpenses(res.data);
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    const formatDate = (isoDate) => {
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    };

    const [filter, setFilter] = useState({ category: '', date: '' });

    const applyFilter = async () => {
        const params = new URLSearchParams();

        if (filter.category) params.append('category', filter.category);
        if (filter.date) params.append('date', filter.date);

        const res = await axios.get(`${EXPENSE_TRACKER_API_URL}/expenses?${params.toString()}`);
        setExpenses(res.data);
    };

    const resetFilter = async () => {
        setFilter({ category: '', date: '' });
        loadExpenses();
    };

    const handleDelete = async id => {
        await axios.delete(`${EXPENSE_TRACKER_API_URL}/expenses/${id}`);
        loadExpenses();
    };

    return (
        <div className="expenses-container">
            <Header />

            <Link to="/expenses/create">
                <button className="expense-create">
                    Add new expense
                </button>
            </Link>

            <h4>Your Summary</h4>
            <div className="expense-summary">
                <div className="summary-box">
                    <h4>Total Expenses</h4>
                    <p>{expenses.length}</p>
                </div>
                <div className="summary-box">
                    <h4>Total Spent</h4>
                    <p>£{expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2)}</p>
                </div>
            </div>

            <h4>Filter your Expenses</h4>
            <div className="expense-filters">
                <select value={filter.category} onChange={e => setFilter({ ...filter, category: e.target.value })}>
                    <option value="">All Categories</option>
                    <option value="Transport">Transport</option>
                    <option value="Food">Food</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Rent">Rent</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                </select>

                <input
                    type="date"
                    value={filter.date}
                    onChange={e => setFilter({ ...filter, date: e.target.value })}
                />

                <button onClick={applyFilter}>Apply Filter</button>
                <button onClick={resetFilter}>Reset</button>
            </div>

            <h4>Your Expenses</h4>
            {expenses.length === 0 ? (
                <p className="no-expenses">No expenses found. Please create some.</p>
            ) : (
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
            )}
        </div>
    );
}