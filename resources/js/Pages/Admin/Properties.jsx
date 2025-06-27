import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-indigo-800">Manage Properties</h1>
            <button onClick={handleAdd} className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add Property</button>
            {showForm && (
                <form onSubmit={handleFormSubmit} className="mb-8 bg-white p-6 rounded shadow max-w-xl">
                    <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit' : 'Add'} Property</h2>
                    {formError && <div className="text-red-500 mb-2">{formError}</div>}
                    <div className="mb-2">
                        <label className="block mb-1">Title</label>
                        <input name="title" value={form.title} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Description</label>
                        <textarea name="description" value={form.description} onChange={handleFormChange} rows={3} className="w-full border rounded px-3 py-2"></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div>
                            <label className="block mb-1">Surface (m²)</label>
                            <input name="surface" type="number" value={form.surface} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block mb-1">Rooms</label>
                            <input name="rooms" type="number" value={form.rooms} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Bedrooms</label>
                        <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Address</label>
                        <input name="address" value={form.address} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">City</label>
                        <input name="city" value={form.city} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Price</label>
                        <input name="price" type="number" value={form.price} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Status</label>
                        <select name="status" value={form.status} onChange={handleFormChange} className="w-full border rounded px-3 py-2">
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                            <option value="rented">Rented</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Type</label>
                        <select name="type" value={form.type} onChange={handleFormChange} className="w-full border rounded px-3 py-2">
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="land">Land</option>
                            <option value="commercial">Commercial</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Category</label>
                        <select name="category_id" value={form.category_id} onChange={handleFormChange} className="w-full border rounded px-3 py-2">
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Images</label>
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full border rounded px-3 py-2" />
                        {images.length > 0 && (
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative">
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`preview-${idx}`}
                                            className="w-20 h-20 object-cover border rounded"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
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
                                <th className="px-4 py-2 border">Title</th>
                                <th className="px-4 py-2 border">City</th>
                                <th className="px-4 py-2 border">Price</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Type</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map(property => (
                                <tr key={property.id}>
                                    <td className="px-4 py-2 border">{property.id}</td>
                                    <td className="px-4 py-2 border">{property.title}</td>
                                    <td className="px-4 py-2 border">{property.city}</td>
                                    <td className="px-4 py-2 border">${property.price?.toLocaleString() ?? 'N/A'}</td>
                                    <td className="px-4 py-2 border">{property.status}</td>
                                    <td className="px-4 py-2 border">{property.type}</td>
                                    <td className="px-4 py-2 border">
                                        <button onClick={() => handleEdit(property)} className="text-blue-600 hover:underline mr-2">Edit</button>
                                        <button onClick={() => handleDelete(property.id)} className="text-red-600 hover:underline">Delete</button>
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