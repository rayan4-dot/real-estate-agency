import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-indigo-800">Manage Appointments</h1>
            <button onClick={handleAdd} className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Add Appointment</button>
            {showForm && (
                <form onSubmit={handleFormSubmit} className="mb-8 bg-white p-6 rounded shadow max-w-xl">
                    <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit' : 'Add'} Appointment</h2>
                    {formError && <div className="text-red-500 mb-2">{formError}</div>}
                    <div className="mb-2">
                        <label className="block mb-1">Name</label>
                        <input name="name" value={form.name} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Email</label>
                        <input name="email" type="email" value={form.email} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Phone</label>
                        <input name="phone" value={form.phone} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Date</label>
                        <input name="date" type="date" value={form.date} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Time</label>
                        <input name="time" type="time" value={form.time} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Property ID</label>
                        <input name="property_id" value={form.property_id} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">User ID</label>
                        <input name="user_id" value={form.user_id} onChange={handleFormChange} className="w-full border rounded px-3 py-2" />
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
                                <th className="px-4 py-2 border">Phone</th>
                                <th className="px-4 py-2 border">Date</th>
                                <th className="px-4 py-2 border">Time</th>
                                <th className="px-4 py-2 border">Property ID</th>
                                <th className="px-4 py-2 border">User ID</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appt => (
                                <tr key={appt.id}>
                                    <td className="px-4 py-2 border">{appt.id}</td>
                                    <td className="px-4 py-2 border">{appt.name}</td>
                                    <td className="px-4 py-2 border">{appt.email}</td>
                                    <td className="px-4 py-2 border">{appt.phone}</td>
                                    <td className="px-4 py-2 border">{appt.date}</td>
                                    <td className="px-4 py-2 border">{appt.time}</td>
                                    <td className="px-4 py-2 border">{appt.property_id}</td>
                                    <td className="px-4 py-2 border">{appt.user_id}</td>
                                    <td className="px-4 py-2 border">
                                        <button onClick={() => handleEdit(appt)} className="text-blue-600 hover:underline mr-2">Edit</button>
                                        <button onClick={() => handleDelete(appt.id)} className="text-red-600 hover:underline">Delete</button>
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