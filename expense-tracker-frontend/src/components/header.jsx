import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {
    const { logout } = useContext(AuthContext);

    return (
        <div className="expenses-header">
            <h2>
                <Link to="/expenses" className="header-link">ExpenseTracker</Link>
            </h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
