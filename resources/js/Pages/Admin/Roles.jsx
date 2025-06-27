import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminRoles() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        id: null,
        name: '',
    });
    const [formError, setFormError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const fetchRoles = () => {
        setLoading(true);
        axios.get('/api/roles', { withCredentials: true })
            .then(res => setRoles(res.data))
            .catch(() => setError('Failed to fetch roles.'))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        fetchRoles();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this role?')) return;
        axios.delete(`/api/roles/${id}`, { withCredentials: true })
            .then(() => fetchRoles())
            .catch(() => alert('Failed to delete role.'));
    };

    const handleEdit = (role) => {
        setForm({ id: role.id, name: role.name });
        setIsEdit(true);
        setShowForm(true);
        setFormError(null);
    };

    const handleAdd = () => {
        setForm({ id: null, name: '' });
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
        const payload = { name: form.name };
        if (isEdit) {
            axios.put(`/api/roles/${form.id}`, payload, { withCredentials: true })
                .then(() => {
                    setShowForm(false);
                    fetchRoles();
                })
                .catch(err => setFormError('Failed to update role.'));
        } else {
            axios.post('/api/roles', payload, { withCredentials: true })
                .then(() => {
                    setShowForm(false);
                    fetchRoles();
                })
                .catch(err => setFormError('Failed to add role.'));
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-indigo-800">Manage Roles</h1>
            <button onClick={handleAdd} className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add Role</button>
            {showForm && (
                <form onSubmit={handleFormSubmit} className="mb-8 bg-white p-6 rounded shadow max-w-xl">
                    <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit' : 'Add'} Role</h2>
                    {formError && <div className="text-red-500 mb-2">{formError}</div>}
                    <div className="mb-2">
                        <label className="block mb-1">Name</label>
                        <input name="name" value={form.name} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
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
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(role => (
                                <tr key={role.id}>
                                    <td className="px-4 py-2 border">{role.id}</td>
                                    <td className="px-4 py-2 border">{role.name}</td>
                                    <td className="px-4 py-2 border">
                                        <button onClick={() => handleEdit(role)} className="text-blue-600 hover:underline mr-2">Edit</button>
                                        <button onClick={() => handleDelete(role.id)} className="text-red-600 hover:underline">Delete</button>
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