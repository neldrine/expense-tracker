import { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EXPENSE_TRACKER_API_URL } from '../config';
import '../css/ExpensesCreate.css';
import Header from "../components/header.jsx";
import {AuthContext} from "../context/AuthContext.jsx";

export default function ExpenseCreate() {
    const [form, setForm] = useState({ description: '', amount: '', category: '', date: '' });
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post(`${EXPENSE_TRACKER_API_URL}/expenses`, form);
        navigate('/expenses');
    };

    return (
        <div className="expenses-container">
            <Header />
            <form onSubmit={handleSubmit} className="expense-form">
                <h2>Add Expense</h2>
                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
                <select name="category" value={form.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Transport">Transport</option>
                    <option value="Food">Food</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Rent">Rent</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                </select>
                <input name="amount" placeholder="Amount" type="number" value={form.amount} onChange={handleChange} required />
                <input name="date" type="date" value={form.date} onChange={handleChange} required />
                <button type="submit">Save</button>
            </form>
        </div>

    );
}
