import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
    const { user, token } = useContext(AuthContext);

    return (
        <div className="login-form">
            <h2>ExpenseTracker</h2>
            {token ? (
                <>
                    <p className="welcome-message">Hello, {user?.name}!</p>
                    <Link to="/expenses">
                        <button className="btn-block">Go to Dashboard</button>
                    </Link>
                </>
            ) : (
                <div className="auth-links">
                    <Link to="/login">
                        <button className="btn-block">Login</button>
                    </Link>
                </div>
            )}
        </div>
    );
}
