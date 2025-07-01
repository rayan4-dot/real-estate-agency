import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        id: null,
        title: '',
        description: '',
        surface: '',
        rooms: '',
        bedrooms: '',
        address: '',
        city: '',
        price: '',
        status: 'available',
        type: 'house',
        category_id: '',
    });
    const [formError, setFormError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchProperties = () => {
        setLoading(true);
        axios.get('/api/properties', { withCredentials: true })
            .then(res => setProperties(res.data))
            .catch(() => setError('Failed to fetch properties.'))
            .finally(() => setLoading(false));
    };

    const fetchCategories = () => {
        axios.get('/api/categories', { withCredentials: true })
            .then(res => setCategories(res.data))
            .catch(() => console.error('Failed to fetch categories.'));
    };

    useEffect(() => {
        fetchProperties();
        fetchCategories();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;
        axios.delete(`/api/properties/${id}`, { withCredentials: true })
            .then(() => fetchProperties())
            .catch(() => alert('Failed to delete property.'));
    };

    const handleEdit = (property) => {
        setForm({
            id: property.id,
            title: property.title ?? '',
            description: property.description ?? '',
            surface: property.surface ?? '',
            rooms: property.rooms ?? '',
            bedrooms: property.bedrooms ?? '',
            address: property.address ?? '',
            city: property.city ?? '',
            price: property.price ?? '',
            status: property.status ?? 'available',
            type: property.type ?? 'house',
            category_id: property.category_id ?? '',
        });
        setIsEdit(true);
        setShowForm(true);
        setFormError(null);
    };

    const handleAdd = () => {
        setForm({ 
            id: null, 
            title: '', 
            description: '', 
            surface: '', 
            rooms: '', 
            bedrooms: '', 
            address: '', 
            city: '', 
            price: '', 
            status: 'available', 
            type: 'house', 
            category_id: '' 
        });
        setIsEdit(false);
        setShowForm(true);
        setFormError(null);
        setImages([]);
    };

    const handleFormChange = (e) => {
        const value = e.target.value === '' ? '' : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormError(null);
        
        // Validate required fields
        if (!form.title.trim()) {
            setFormError('Title is required');
            return;
        }
        
        const formData = new FormData();
        formData.append('title', form.title.trim());
        formData.append('description', form.description || '');
        formData.append('surface', form.surface || '');
        formData.append('rooms', form.rooms || '');
        formData.append('bedrooms', form.bedrooms || '');
        formData.append('address', form.address || '');
        formData.append('city', form.city || '');
        formData.append('price', form.price || '');
        formData.append('status', form.status);
        formData.append('type', form.type);
        formData.append('category_id', form.category_id || '');
        
        images.forEach((img, idx) => {
            formData.append('images[]', img);
        });
        
        if (isEdit) {
            axios.post(`/api/properties/${form.id}?_method=PUT`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
                .then(() => {
                    setShowForm(false);
                    fetchProperties();
                })
                .catch(err => {
                    if (err.response?.data?.message) {
                        setFormError(err.response.data.message);
                    } else {
                        setFormError('Failed to update property.');
                    }
                });
        } else {
            axios.post('/api/properties', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
                .then(() => {
                    setShowForm(false);
                    fetchProperties();
                })
                .catch(err => {
                    if (err.response?.data?.message) {
                        setFormError(err.response.data.message);
                    } else {
                        setFormError('Failed to add property.');
                    }
                });
        }
    };

    return (
        <AdminLayout 
            title="Property Management" 
            subtitle="Create and manage real estate properties"
        >
            <div className="flex justify-end mb-8">
                <button 
                    onClick={handleAdd} 
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Property
                </button>
            </div>

            {showForm && (
                <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{isEdit ? 'Edit' : 'Add'} Property</h2>
                    {formError && <div className="text-red-500 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">{formError}</div>}
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                            <input 
                                name="title" 
                                value={form.title} 
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
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Surface (m²)</label>
                                <input 
                                    name="surface" 
                                    type="number" 
                                    value={form.surface} 
                                    onChange={handleFormChange} 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Rooms</label>
                                <input 
                                    name="rooms" 
                                    type="number" 
                                    value={form.rooms} 
                                    onChange={handleFormChange} 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
                            <input 
                                name="bedrooms" 
                                type="number" 
                                value={form.bedrooms} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                            <input 
                                name="address" 
                                value={form.address} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                            <input 
                                name="city" 
                                value={form.city} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                            <input 
                                name="price" 
                                type="number" 
                                value={form.price} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                <select 
                                    name="status" 
                                    value={form.status} 
                                    onChange={handleFormChange} 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="available">Available</option>
                                    <option value="sold">Sold</option>
                                    <option value="rented">Rented</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                                <select 
                                    name="type" 
                                    value={form.type} 
                                    onChange={handleFormChange} 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="house">House</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="land">Land</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                            <select 
                                name="category_id" 
                                value={form.category_id} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="">Select category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
                            <p className="text-sm text-gray-500 mt-2">You can select multiple images</p>
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
                        <h3 className="text-lg font-semibold text-gray-900">All Properties</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {properties.map(property => (
                                    <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{property.id}</td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">{property.title}</div>
                                                <div className="text-sm text-gray-500">{property.address}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">${property.price}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                property.status === 'available' ? 'bg-green-100 text-green-800' :
                                                property.status === 'sold' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {property.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 capitalize">{property.type}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleEdit(property)} 
                                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(property.id)} 
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