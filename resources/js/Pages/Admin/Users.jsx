import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../Components/AdminLayout';

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
        <AdminLayout 
            title="User Management" 
            subtitle="Create and manage system users"
        >
            <div className="flex justify-end mb-8">
                <button 
                    onClick={handleAdd} 
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add User
                </button>
            </div>

            {showForm && (
                <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{isEdit ? 'Edit' : 'Add'} User</h2>
                    {formError && <div className="text-red-500 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">{formError}</div>}
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                            <input 
                                name="name" 
                                value={form.name} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                            <input 
                                name="email" 
                                type="email" 
                                value={form.email} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password {isEdit && <span className="text-gray-400">(leave blank to keep current)</span>}
                            </label>
                            <input 
                                name="password" 
                                type="password" 
                                value={form.password} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                            <select 
                                name="role_id" 
                                value={form.role_id} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="">Select role</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">{isEdit ? 'Update' : 'Add'}</button>
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 py-16 bg-red-50 rounded-lg">{error}</div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.id}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{user.role_id || 'No role'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleEdit(user)} 
                                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(user.id)} 
                                                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
} 