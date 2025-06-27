import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        role_id: '',
    });
    const [formError, setFormError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const fetchUsers = () => {
        setLoading(true);
        axios.get('/api/users', { withCredentials: true })
            .then(res => setUsers(res.data))
            .catch(() => setError('Failed to fetch users.'))
            .finally(() => setLoading(false));
    };
    const fetchRoles = () => {
        axios.get('/api/roles', { withCredentials: true })
            .then(res => setRoles(res.data))
            .catch(() => setRoles([]));
    };
    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        axios.delete(`/api/users/${id}`, { withCredentials: true })
            .then(() => fetchUsers())
            .catch(() => alert('Failed to delete user.'));
    };

    const handleEdit = (user) => {
        setForm({
            id: user.id,
            name: user.name,
            email: user.email,
            password: '',
            role_id: user.role_id || '',
        });
        setIsEdit(true);
        setShowForm(true);
        setFormError(null);
    };

    const handleAdd = () => {
        setForm({ id: null, name: '', email: '', password: '', role_id: '' });
        setIsEdit(false);
        setShowForm(true);
        setFormError(null);
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormError(null);
        const payload = {
            name: form.name,
            email: form.email,
            password: form.password || undefined,
            role_id: form.role_id,
        };
        if (isEdit) {
            axios.put(`/api/users/${form.id}`, payload, { withCredentials: true })
                .then(() => {
                    setShowForm(false);
                    fetchUsers();
                })
                .catch(err => setFormError('Failed to update user.'));
        } else {
            axios.post('/api/users', payload, { withCredentials: true })
                .then(() => {
                    setShowForm(false);
                    fetchUsers();
                })
                .catch(err => setFormError('Failed to add user.'));
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-indigo-800">Manage Users</h1>
            <button onClick={handleAdd} className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add User</button>
            {showForm && (
                <form onSubmit={handleFormSubmit} className="mb-8 bg-white p-6 rounded shadow max-w-xl">
                    <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit' : 'Add'} User</h2>
                    {formError && <div className="text-red-500 mb-2">{formError}</div>}
                    <div className="mb-2">
                        <label className="block mb-1">Name</label>
                        <input name="name" value={form.name} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Email</label>
                        <input name="email" type="email" value={form.email} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Password {isEdit && <span className="text-gray-400">(leave blank to keep current)</span>}</label>
                        <input name="password" type="password" value={form.password} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Role</label>
                        <select name="role_id" value={form.role_id} onChange={handleFormChange} className="w-full border rounded px-3 py-2">
                            <option value="">Select role</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">{isEdit ? 'Update' : 'Add'}</button>
                        <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>
                    </div>
                </form>
            )}
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">ID</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Role</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td className="px-4 py-2 border">{user.id}</td>
                                    <td className="px-4 py-2 border">{user.name}</td>
                                    <td className="px-4 py-2 border">{user.email}</td>
                                    <td className="px-4 py-2 border">{user.role_id || ''}</td>
                                    <td className="px-4 py-2 border">
                                        <button onClick={() => handleEdit(user)} className="text-blue-600 hover:underline mr-2">Edit</button>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
} 