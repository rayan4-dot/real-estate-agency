import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        id: null,
        name: '',
        description: '',
    });
    const [formError, setFormError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const fetchCategories = () => {
        setLoading(true);
        axios.get('/api/categories', { withCredentials: true })
            .then(res => setCategories(res.data))
            .catch(() => setError('Failed to fetch categories.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        axios.delete(`/api/categories/${id}`, { withCredentials: true })
            .then(() => fetchCategories())
            .catch(() => alert('Failed to delete category.'));
    };

    const handleEdit = (category) => {
        setForm({
            id: category.id,
            name: category.name || '',
            description: category.description || '',
        });
        setIsEdit(true);
        setShowForm(true);
        setFormError(null);
    };

    const handleAdd = () => {
        setForm({ id: null, name: '', description: '' });
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
            description: form.description,
        };
        if (isEdit) {
            axios.put(`/api/categories/${form.id}`, payload, { withCredentials: true })
                .then(() => {
                    setShowForm(false);
                    fetchCategories();
                })
                .catch(err => setFormError('Failed to update category.'));
        } else {
            axios.post('/api/categories', payload, { withCredentials: true })
                .then(() => {
                    setShowForm(false);
                    fetchCategories();
                })
                .catch(err => setFormError('Failed to add category.'));
        }
    };

    return (
        <AdminLayout 
            title="Category Management" 
            subtitle="Create and manage property categories"
        >
            <div className="flex justify-end mb-8">
                <button 
                    onClick={handleAdd} 
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Category
                </button>
            </div>

            {showForm && (
                <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{isEdit ? 'Edit' : 'Add'} Category</h2>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea 
                                name="description" 
                                value={form.description} 
                                onChange={handleFormChange} 
                                rows={3} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            ></textarea>
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
                        <h3 className="text-lg font-semibold text-gray-900">All Categories</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {categories.map(category => (
                                    <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{category.id}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{category.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleEdit(category)} 
                                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(category.id)} 
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