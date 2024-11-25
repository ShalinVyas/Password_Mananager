import React, { useState } from "react";

const Login = ({ onLogin }) => {
    const [form, setForm] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(form);
    };

    return (
        <div className="p-4 flex flex-col items-center justify-center h-screen bg-green-100">
            <h1 className="text-4xl font-bold mb-4 text-green-700">
                <span>&lt;</span> Pass_Man_Pro <span>&gt;</span>
            </h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-80"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter username"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded w-full"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
