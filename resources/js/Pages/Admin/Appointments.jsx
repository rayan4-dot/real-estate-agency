import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../Components/AdminLayout';

export default function AdminAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        property_id: '',
        user_id: '',
    });
    const [formError, setFormError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const fetchAppointments = () => {
        setLoading(true);
        axios.get('/api/appointments', { withCredentials: true })
            .then(res => setAppointments(res.data))
            .catch(() => setError('Failed to fetch appointments.'))
            .finally(() => setLoading(false));
    };
    useEffect(() => { fetchAppointments(); }, []);

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this appointment?')) return;
        axios.delete(`/api/appointments/${id}`, { withCredentials: true })
            .then(() => fetchAppointments())
            .catch(() => alert('Failed to delete appointment.'));
    };

    const handleEdit = (appt) => {
        setForm({
            id: appt.id,
            name: appt.name || '',
            email: appt.email || '',
            phone: appt.phone || '',
            date: appt.date || '',
            time: appt.time || '',
            property_id: appt.property_id || '',
            user_id: appt.user_id || '',
        });
        setIsEdit(true); setShowForm(true); setFormError(null);
    };

    const handleAdd = () => {
        setForm({ id: null, name: '', email: '', phone: '', date: '', time: '', property_id: '', user_id: '' });
        setIsEdit(false); setShowForm(true); setFormError(null);
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormError(null);
        // Ensure time is in HH:mm:ss format
        let time = form.time;
        if (time && time.length === 5) {
            time = time + ':00';
        }
        const payload = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            date: form.date,
            time: time,
            property_id: form.property_id,
            user_id: form.user_id,
        };
        if (isEdit) {
            axios.put(`/api/appointments/${form.id}`, payload, { withCredentials: true })
                .then(() => { setShowForm(false); fetchAppointments(); })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.errors) {
                        setFormError(Object.values(err.response.data.errors).join(' '));
                    } else {
                        setFormError('Failed to update appointment.');
                    }
                });
        } else {
            axios.post('/api/appointments', payload, { withCredentials: true })
                .then(() => { setShowForm(false); fetchAppointments(); })
                .catch((err) => {
                    if (err.response && err.response.data && err.response.data.errors) {
                        setFormError(Object.values(err.response.data.errors).join(' '));
                    } else {
                        setFormError('Failed to add appointment.');
                    }
                });
        }
    };

    return (
        <AdminLayout 
            title="Appointment Management" 
            subtitle="Manage property viewing appointments"
        >
            <div className="flex justify-end mb-8">
                <button 
                    onClick={handleAdd} 
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Appointment
                </button>
            </div>

            {showForm && (
                <div className="mb-8 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{isEdit ? 'Edit' : 'Add'} Appointment</h2>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input 
                                name="email" 
                                type="email" 
                                value={form.email} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                            <input 
                                name="phone" 
                                value={form.phone} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                            <input 
                                name="date" 
                                type="date" 
                                value={form.date} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                            <input 
                                name="time" 
                                type="time" 
                                value={form.time} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Property ID</label>
                            <input 
                                name="property_id" 
                                value={form.property_id} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">User ID</label>
                            <input 
                                name="user_id" 
                                value={form.user_id} 
                                onChange={handleFormChange} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                            />
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
                        <h3 className="text-lg font-semibold text-gray-900">All Appointments</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Property ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">User ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {appointments.map(appt => (
                                    <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{appt.id}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{appt.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{appt.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{appt.phone}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{appt.date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{appt.time}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{appt.property_id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{appt.user_id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleEdit(appt)} 
                                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition"
                                                >
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(appt.id)} 
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