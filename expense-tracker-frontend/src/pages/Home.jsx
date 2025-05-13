import { useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

export default function Login() {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ name: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(form.name, form.password);
            navigate('/expenses');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
                <label>Username</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Username" required/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input id="password" name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" required/>

            </div>

            <button type="submit" className="submit-button">Login</button>
        </form>
    );
}
