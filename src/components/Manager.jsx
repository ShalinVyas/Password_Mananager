import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [editId, setEditId] = useState(null);

    const copyText = (text) => navigator.clipboard.writeText(text);

    const getPasswords = async () => {
        try {
            const res = await fetch("http://localhost:3000/");
            const passwords = await res.json();
            setPasswordArray(passwords || []);
        } catch (err) {
            console.error("Error fetching passwords:", err);
        }
    };

    useEffect(() => {
        getPasswords();
    }, []);

    const savePassword = async () => {
        if (form.site.length < 4 || form.username.length < 4 || form.password.length < 4) {
            alert("Error: Fields must be at least 4 characters long.");
            return;
        }
    
        const payload = {
            ...form,
            id: editId || uuidv4(), // Use `editId` if editing, otherwise create a new ID.
        };
    
        try {
            const res = await fetch("http://localhost:3000/", {
                method: editId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
    
            const result = await res.json();
            if (result.success) {
                getPasswords(); // Refresh the password list.
                setForm({ site: "", username: "", password: "" }); // Clear the form.
                setEditId(null); // Reset the edit state.
            } else {
                console.error("Failed to save password.");
            }
        } catch (err) {
            console.error("Error saving password:", err);
        }
    };
    

    const deletePassword = async (id) => {
        try {
            const res = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            const result = await res.json();
            if (result.success) getPasswords();
        } catch (err) {
            console.error("Error deleting password:", err);
        }
    };

    const editPassword = (id) => {
        const item = passwordArray.find((entry) => entry.id === id);
        if (item) {
            setForm({ site: item.site, username: item.username, password: item.password });
            setEditId(id);
        } else {
            console.error("Item not found for editing.");
        }
    };
    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-2 md:p-0 md:mycontainer">
            <h1 className="text-4xl font-bold text-center">
                <span className="text-green-700">&lt;</span> Pass_Man_Pro <span className="text-green-700">&gt;</span>
            </h1>

            <p className="text-green-900 text-lg text-center">One stop shop for all password stuff</p>
            
            <div className="text-black flex flex-col p-4 gap-8 items-center">
                <input
                    value={form.site}
                    onChange={handleChange}
                    placeholder="Enter Website URL"
                    className="rounded-full border border-green-500 w-full p-4 py-1"
                    type="text"
                    name="site"
                />
                <input
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    className="rounded-full border border-green-500 w-full p-4 py-1"
                    type="text"
                    name="username"
                />
                <input
                    ref={passwordRef}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="rounded-full border border-green-500 w-full p-4 py-1"
                    type="password"
                    name="password"
                />
                <button
                    onClick={savePassword}
                    className="flex justify-center items-center bg-slate-300 hover:bg-slate-500 rounded-full px-4 py-2 w-fit border-2 border-green-900"
                >
                    <lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                    ></lord-icon>
                    {editId ? "Update Password" : "Save Password"}
                </button>
            </div>

            <div className="passwords">
                <h2 className="text-2xl font-bold py-4">Your Passwords</h2>
                {passwordArray.length === 0 ? (
                    <div>No Passwords to Show</div>
                ) : (
                    <table className="table-auto w-full rounded-md overflow-hidden text-center">
                        <thead className="bg-green-800 text-white">
                            <tr>
                                <th className="py-2">Site</th>
                                <th className="py-2">Username</th>
                                <th className="py-2">Password</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-green-100">
                            {passwordArray.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-2">
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target="_blank">
                                                {item.site}
                                            </a>
                                            <button classname='lordiconcopy size-2 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/fjvfsqea.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-2"><div className='flex items-center justify-center'>
                                            <a target="_blank">
                                                {item.username}
                                            </a>
                                            <button classname='lordiconcopy size-2 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/fjvfsqea.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </button>
                                        </div></td>
                                    <td className="py-2"><div className='flex items-center justify-center'>
                                            <a target="_blank">
                                                {item.password}
                                            </a>
                                            <button classname='lordiconcopy size-2 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/fjvfsqea.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </button>
                                        </div></td>
                                    <td className="py-2">
                                        <button onClick={() => editPassword(item.id)} className="mx-1"><lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}                                            >
                                            </lord-icon></button>
                                        <button onClick={() => deletePassword(item.id)} className="mx-1"><lord-icon
                                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                                trigger="morph"
                                                state="morph-trash-in"
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}                                            >
                                            </lord-icon>
</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Manager;
