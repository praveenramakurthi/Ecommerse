import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css'; // Import the CSS for styling

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle sign-in logic here
        try {
            const loginResponse = await fetch("http://localhost:8080/api/signin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            if (!loginResponse.ok) {
                const errorMsg = loginResponse.json();
                console.log("errorMsg", errorMsg);
                setError(errorMsg.error);
                return;
            }
            const { token, user } = await loginResponse.json();
            localStorage.setItem('token', token); 
            console.log("user", user);
            navigate("/ekart");
        }
        catch (err) {
            console.error("Error during sign in:", err);
            setError("An error occurred. Please try again.");
        }
    };
    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-msg">{error}</div>}
                    <button type="submit" className="signin-button">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
