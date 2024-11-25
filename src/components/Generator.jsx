import React, { useState } from 'react';
import './Generator.css';

const Generator = () => {
    const [password, setPassword] = useState('');
    const [selectedLength, setSelectedLength] = useState('');
    const [strength, setStrength] = useState('');
    const [feedback, setFeedback] = useState([]);

    // Generate Password Function
    const handleGeneratePassword = () => {
        if (!selectedLength) {
            alert("Please select a password length.");
            return;
        }

        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        const len =
            selectedLength === "20+"
                ? 20
                : Math.floor((parseInt(selectedLength.split('-')[1]) + parseInt(selectedLength.split('-')[0])) / 2);

        let result = '';
        for (let i = 0; i < len; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }

        setPassword(result);
        setStrength('Strong'); // Placeholder; can integrate stronger logic if needed.
        setFeedback(['Your generated password is secure.']);
    };

    // Check Password Strength Function
    const handleCheckStrength = (event) => {
        event.preventDefault();
        const userPassword = event.target.password.value;

        const feedbackMessages = [];
        let strengthScore = 0;

        // Criteria for strong password
        if (userPassword.length >= 12) strengthScore++;
        else feedbackMessages.push("Increase password length to at least 12 characters.");

        if (/[A-Z]/.test(userPassword)) strengthScore++;
        else feedbackMessages.push("Include at least one uppercase letter.");

        if (/[a-z]/.test(userPassword)) strengthScore++;
        else feedbackMessages.push("Include at least one lowercase letter.");

        if (/\d/.test(userPassword)) strengthScore++;
        else feedbackMessages.push("Include at least one numeric digit.");

        if (/[!@#$%^&*()_+]/.test(userPassword)) strengthScore++;
        else feedbackMessages.push("Include at least one special character (e.g., !, @, #).");

        // Assigning strength based on score
        if (strengthScore >= 4) {
            setStrength('Strong');
            feedbackMessages.push("Your password is strong.");
        } else if (strengthScore === 3) {
            setStrength('Moderate');
            feedbackMessages.push("Your password is moderate. Consider making it stronger.");
        } else {
            setStrength('Weak');
            feedbackMessages.push("Your password is weak. Please improve it.");
        }

        setFeedback(feedbackMessages);
    };

    return (
        <div className="generator-container">
            <h1>Password Generator & Checker</h1>

            {/* Password Length Selection */}
            <div className="radio-group">
                {['8-12', '12-16', '16-20', '20+'].map((range) => (
                    <label key={range}>
                        <input
                            type="radio"
                            name="length"
                            value={range}
                            onChange={() => setSelectedLength(range)}
                        />{' '}
                        {range}
                    </label>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button className="flex justify-center items-center bg-slate-300 hover:bg-slate-500 rounded-full px-4 py-2 w-fit border-2 border-green-900" onClick={handleGeneratePassword}>
                    <lord-icon
                        src="https://cdn.lordicon.com/nfuackpv.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#121331,secondary:#2516c7"
                        style={{ "width": "35px", "height": "35px" }}>
                    </lord-icon>
                    Generate
                </button>
            </div>

            {password && <div className="password-display ">Generated Password: {password}</div>}

            {/* Password Strength Checker */}
            <form onSubmit={handleCheckStrength} className="strength-checker-form">
                <div className="password-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        required
                        className="password-input"
                    />
                    <button type="submit" className="flex justify-center items-center bg-slate-300 hover:bg-slate-500 rounded-full px-4 py-2 w-fit border-2 border-green-900">
                        <lord-icon
                            src="https://cdn.lordicon.com/ygrhegcx.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#16c79e"
                            style={{ "width": "35px", "height": "35px" }}>
                        </lord-icon>
                        Check Strength</button>
                </div>
            </form>

            {strength && <div className="strength-display">Password Strength: {strength}</div>}
            {feedback.length > 0 && (
                <ul className="feedback-list">
                    {feedback.map((f, index) => (
                        <li key={index}>{f}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Generator;
