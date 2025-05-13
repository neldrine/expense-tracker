import { useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <input name="name" value={form.name} onChange={handleChange} placeholder="Username" required />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}
